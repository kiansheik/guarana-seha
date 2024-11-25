import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Button,
  Alert,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { saveQPhotoToDatabase, addQuestionnaireData, getLatestQuestionnaireByType, updateQuestionnaireData } from '../db'; // Import your save function
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { cadastrar_schema } from './schemas/Cadastrar'
import { individual_schema } from './schemas/Individual'

const ImagePickerScreen = (user, questionnaireId) => {
  const [imageUri, setImageUri] = useState(null);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera to take photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };
  const handleLaunchCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;
    console.log("camera")
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 1,
    };

    launchCamera(options, (response) => {
      handleImageResponse(response);
    });
  };

  const handleLaunchLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    console.log("library")
    launchImageLibrary(options, (response) => {
      handleImageResponse(response);
    });
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      Alert.alert('Cancelled', 'No photo selected');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'An error occurred');
    } else if (response.assets && response.assets.length > 0) {
      const selectedImageUri = response.assets[0].uri;
      setImageUri(selectedImageUri);
      saveQPhotoToDatabase(selectedImageUri, user.id, questionnaireId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa e outras fotos</Text>
      <Button title="Câmera" onPress={handleLaunchCamera} />
      <View style={styles.spacer} />
      <Button title="Fotos" onPress={handleLaunchLibrary} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
};

const generateSections = (jsonStructure, formData, setFormData, styles) => {
  return Object.keys(jsonStructure).map((key) => {
    const field = jsonStructure[key];
    const fieldType = field.type;

    // Generate content dynamically
    const content = (
      <View key={key}>
        {fieldType === 'table' ? (
          <View>
            <Text style={styles.label}>{field.label}:</Text>
            {formData[key]?.map((row, index) => (
              <View key={index} style={styles.card}>
                {field.columns.map((column) => (
                  <View key={column.key} style={styles.cardRow}>
                    <Text style={styles.label}>{column.label}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={column.placeholder || ''}
                      value={row[column.key]}
                      onChangeText={(text) => {
                        const updatedRows = [...formData[key]];
                        updatedRows[index][column.key] = text;
                        setFormData((prev) => ({ ...prev, [key]: updatedRows }));
                      }}
                    />
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    const updatedRows = [...formData[key]];
                    updatedRows.splice(index, 1);
                    setFormData((prev) => ({ ...prev, [key]: updatedRows }));
                  }}
                >
                  <Text style={styles.deleteButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                const newRow = {};
                field.columns.forEach((col) => {
                  newRow[col.key] = '';
                });
                setFormData((prev) => ({
                  ...prev,
                  [key]: [...(prev[key] || []), newRow],
                }));
              }}
            >
              <Text style={styles.addButtonText}>+ Add New Row</Text>
            </TouchableOpacity>
          </View>
        ) : fieldType === 'checkbox' ? (
          <View>
            <Text style={styles.label}>{field.label}:</Text>
            <View style={styles.checkboxGroup}>
              {field.options.map((option) => (
                <View key={option} style={styles.checkboxContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      setFormData((prev) => ({
                        ...prev,
                        [key]: formData[key] === option ? '' : option,
                      }))
                    }
                  >
                    <Icon
                      name={
                        formData[key] === option
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      size={24}
                      color="#555"
                    />
                  </TouchableOpacity>
                  <Text style={styles.checkboxLabel}>{option}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.label}>{field.label}:</Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder || ''}
              value={formData[key]}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, [key]: text }))
              }
            />
          </>
        )}
      </View>
    );

    // Return the object in the desired format
    return {
      title: field.label,
      content,
    };
  });
};

const Questionnaire = ({ navigation, route }) => {
  const { user, tipo } = route.params; // Get user details from navigation params
  const [currentStep, setCurrentStep] = useState(0);
  const [jsonStructure, setJsonStructure] = useState(cadastrar_schema);
  const [formData, setFormData] = useState(() => {
    const initialFormData = {};
    if (tipo == "Cadastro") {
      setJsonStructure(cadastrar_schema);
    }
    else {
      setJsonStructure(individual_schema);
    }
    console.log("eyyyyy", cadastrar_schema)
    Object.keys(jsonStructure).forEach((key) => {
      const field = jsonStructure[key];
      if (field.type === 'table') {
        initialFormData[key] = []; // Initialize table fields as empty arrays
      } else if (field.type === 'checkbox') {
        initialFormData[key] = ''; // Initialize checkbox fields as empty strings
      } else {
        initialFormData[key] = ''; // Default initialization for other field types
      }
    });
    initialFormData["data_do_cadastro"] = new Date().toLocaleDateString("pt-BR");
    initialFormData["tipo"] = tipo;
    
    return initialFormData;
  });
  const [questionnaireId, setQuestionnaireId] = useState(0);

  useEffect(() => {
    console.log("CRONK", user.id, tipo)
    // Fetch the latest questionnaire of the same type
    getLatestQuestionnaireByType(user.id, tipo, (latestQuestionnaire) => {
      if (latestQuestionnaire) {
        console.log("CRONK", latestQuestionnaire)
        // Autofill form data with the latest questionnaire data
        setFormData(JSON.parse(latestQuestionnaire.data));
      }
    });
  }, [user.id, tipo]);

  const photo_section = [
    {
      title: 'Tira uma foto',
      content: ImagePickerScreen(user, questionnaireId),
    },
  ];
  
  const sections = [
    ...generateSections(jsonStructure, formData, setFormData, styles),
    ...photo_section,
  ];
  console.log("sections:", sections)
  const totalSteps = sections.length;

  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save the data when the user finishes
      addQuestionnaireData(
        user.id,
        formData,
        () => {
          console.log('Questionnaire Complete');
          console.log('Form Data:', formData);
          navigation.goBack();
        }
      );
      return;
    }
    if (questionnaireId) {
      updateQuestionnaireData(questionnaireId, formData);
    } else{
      addQuestionnaireData(
        user.id,
        formData,
        () => {
          getLatestQuestionnaireByType(user.id, tipo, (latestQuestionnaire) => {
            if (latestQuestionnaire) {
              setQuestionnaireId(latestQuestionnaire.id);
            }
          });
        }
      );
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Cross-Platform Progress Bar */}
      <ProgressBar
        progress={(currentStep + 1) / totalSteps}
        width={null}
        height={10}
        color="#4CAF50"
        unfilledColor="#ddd"
        borderRadius={5}
      />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.title}>{sections[currentStep].title}</Text> */}
        {sections[currentStep].content}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={goToPreviousStep}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.navButton} onPress={goToNextStep}>
          <Text style={styles.navButtonText}>
            {currentStep < totalSteps - 1 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    justifyContent: 'flex-start', // Ensures everything stays at the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4, // Smaller spacing between label and input
    marginTop: 16, // Add spacing above each new field
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    width: '100%', // Ensure input spans full width
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8,
    maxWidth: '48%', // Ensures buttons stay within bounds
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  checkboxGroup: {
    flexDirection: 'column', // Ensures checkboxes are stacked vertically
    alignItems: 'flex-start', // Align items to the left
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row', // Ensure the checkbox and label are side by side
    alignItems: 'center',
    marginBottom: 8, // Add spacing between options
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  cardRow: {
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoStep: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  spacer: {
    height: 20,
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});


export default Questionnaire;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { getQuestionnaireData, getSpecificQuestionnaireData, updateQuestionnaireData } from '../db';
import Icon from 'react-native-vector-icons/MaterialIcons';

  

const Profile = ({ route }) => {
  const { user, questionnaire } = route.params; // Get user and optional questionnaire data
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    if (questionnaire) {
      // Use passed questionnaire data if available
      setQuestionnaireData(JSON.parse(questionnaire.data));
    } else {
      fetchProfileData();
    }
  }, [questionnaire]);

  const fetchProfileData = () => {
    getSpecificQuestionnaireData(questionnaire.id, (data) => {
      if (data && data.length > 0) {
        setQuestionnaireData(JSON.parse(data[0].data));
      }
    });
  };


  const renderField = (key, value, parentKey = null) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
  
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      // If value is a nested object, recursively render fields
      return (
        <View style={styles.nestedContainer} key={fullKey}>
          <Text style={styles.nestedHeader}>{key.replace(/_/g, ' ')}:</Text>
          {Object.keys(value).map((nestedKey) =>
            renderField(nestedKey, value[nestedKey], fullKey)
          )}
        </View>
      );
    } else if (Array.isArray(value)) {
      // If value is an array, render fields for each element
      return (
        <View style={styles.nestedContainer} key={fullKey}>
          <Text style={styles.nestedHeader}>{key.replace(/_/g, ' ')}:</Text>
          {value.map((item, index) =>
            renderField((index+1).toString(), item, fullKey)
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              const updatedArray = [...(value || []), ''];
              handleFieldChange(fullKey, updatedArray);
            }}
          >
            <Text style={styles.addButtonText}>+ Adicionar ítem</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Render editable fields
      return (
        <View style={styles.infoBlock} key={fullKey}>
          <Text style={styles.label}>{key.replace(/_/g, ' ')}:</Text>
          {editableFields[fullKey] ? (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => handleFieldChange(fullKey, text)}
              onBlur={() => saveField(fullKey)}
              autoFocus
            />
          ) : (
            <View style={styles.fieldContainer}>
              <Text style={styles.value}>{value}</Text>
              <TouchableOpacity onPress={() => toggleEditField(fullKey)}>
                <Icon name="edit" size={20} color="#6B8E23" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
  };
  
  const handleFieldChange = (fullKey, value) => {
    const keys = fullKey.split('.');
    setQuestionnaireData((prev) => {
      const updatedData = { ...prev };
      let current = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updatedData;
    });
  };
  
  const saveField = (fullKey) => {
    updateQuestionnaireData(questionnaire.id, { ...questionnaireData });
    toggleEditField(fullKey);
  };
  
  const toggleEditField = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Perfil</Text> */}
  
      <View style={styles.infoBlock}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
  
      <View style={styles.infoBlock}>
        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>{user.cpf}</Text>
      </View>
  
      {questionnaireData ? (
        <>
          <Text style={styles.sectionHeader}>Dados do Formulário</Text>
          {Object.keys(questionnaireData).map((key) =>
            renderField(key, questionnaireData[key])
          )}
        </>
      ) : (
        <Text style={styles.noData}>
          No questionnaire data available for this user.
        </Text>
      )}
    </ScrollView>
  );
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Profile</Text>

//       <View style={styles.infoBlock}>
//         <Text style={styles.label}>Name:</Text>
//         <Text style={styles.value}>{user.name}</Text>
//       </View>

//       <View style={styles.infoBlock}>
//         <Text style={styles.label}>CPF:</Text>
//         <Text style={styles.value}>{user.cpf}</Text>
//       </View>

//       {questionnaireData ? (
//         <>
//           <Text style={styles.sectionHeader}>Questionnaire Data</Text>

//           {Object.keys(questionnaireData).map((key) => (
//             <View style={styles.infoBlock} key={key}>
//               <Text style={styles.label}>{key.replace(/_/g, ' ')}:</Text>

//               {editableFields[key] ? (
//                 <TextInput
//                   style={styles.input}
//                   value={questionnaireData[key]}
//                   onChangeText={(value) => handleFieldChange(key, value)}
//                   onBlur={() => saveField(key)} // Save on blur
//                   autoFocus
//                 />
//               ) : (
//                 <View style={styles.fieldContainer}>
//                   <Text style={styles.value}>{questionnaireData[key]}</Text>
//                   <TouchableOpacity onPress={() => toggleEditField(key)}>
//                     <Icon name="edit" size={20} color="#6B8E23" />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           ))}
//         </>
//       ) : (
//         <Text style={styles.noData}>
//           No questionnaire data available for this user.
//         </Text>
//       )}
//     </ScrollView>
//   );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  infoBlock: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  noData: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    flex: 1,
  },
});

export default Profile;

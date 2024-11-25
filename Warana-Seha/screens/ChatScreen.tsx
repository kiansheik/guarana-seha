import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getQuestionnaireData } from '../db';
import styles from './styles/ChatScreenStyles'; // Import styles


// Utility function to format dates into a more readable format (e.g., "12 out, 24")
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short', year: '2-digit' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

// Utility function to calculate completion percentage
const calculateCompletionPercentage = (data) => {
  const totalFields = Object.keys(data).length;
  const emptyFields = Object.values(data).filter((value) => value === '').length;
  return Math.round(((totalFields - emptyFields) / totalFields) * 100);
};

const ChatScreen = ({ navigation, route }) => {
  const { user } = route.params; // Get user details from navigation params
  const [questionnaires, setQuestionnaires] = useState([]);
  const flatListRef = useRef(null); // Ref for the FlatList


  const fetchQuestionnaires = () => {
    getQuestionnaireData(user.id, (data) => {
      if (data) {
        const sortedData = data.sort(
          (a, b) => new Date(a.date_created) - new Date(b.date_created)
        );
        setQuestionnaires(sortedData);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestionnaires(); // Refresh the questionnaires list
      if (flatListRef.current && questionnaires.length > 0) {
        flatListRef.current.scrollToEnd({ animated: false });
      }
    }, [])
  );
  setTimeout(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, 0);
  useEffect(() => {
    // fetchQuestionnaires();
    if (flatListRef.current && questionnaires.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [questionnaires]);

  const handleCardClick = (questionnaire) => {
    navigation.navigate('Perfil', { user, questionnaire });
  };

  const renderQuestionnaireCard = ({ item }) => {
    const completionPercentage = calculateCompletionPercentage(
      JSON.parse(item.data) // Parse the questionnaire data
    );

    const borderColor =
      item.isCompleted || completionPercentage === 100
        ? '#4CAF50' // Green for completed or 100% concluded
        : '#FFC107'; // Yellow for incomplete

    return (
      <TouchableOpacity
        style={[styles.card, { borderLeftColor: borderColor }]}
        onPress={() => handleCardClick(item)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>
            {completionPercentage === 100
              ? `Concluído em ${formatDate(item.date_modified)}`
              : `Iniciado em ${formatDate(item.date_created)}`}
          </Text>
          <Text style={styles.subtitle}>
            Tipo de formulário: {JSON.parse(item.data)['tipo'] || 'N/A'}
          </Text>
          <Text style={styles.progress}>
            {completionPercentage === 100
              ? 'Concluído'
              : `${completionPercentage}% Concluído`}
          </Text>
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórica de {user.name}</Text>

      <FlatList
      ref={flatListRef}
        data={questionnaires}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderQuestionnaireCard}
        contentContainerStyle={styles.list}
      />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={() => navigation.navigate('Formulário', { user: user, tipo: "Individual" })}
        >
          <Text style={styles.buttonText}>Ficha Técnica Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={() => navigation.navigate('Formulário', { user: user, tipo: "Cadastro" })}
        >
          <Text style={styles.buttonText}>Ficha Técnica Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

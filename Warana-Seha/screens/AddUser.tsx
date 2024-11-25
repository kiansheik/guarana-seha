import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addUser } from '../db';

const AddUser = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const saveUser = () => {
    if (!name.trim() || !cpf.trim()) {
    //   Alert.alert('Error', 'Name and CPF cannot be empty.');
      return;
    }

    addUser(name, cpf);
    // Alert.alert('Success', 'User added successfully!');
    // route.params.refreshUsers(); // Refresh user list in ChatList
    navigation.goBack(); // Navigate back to ChatList
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastrar Novo Produtor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveUser}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#6B8E23',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddUser;

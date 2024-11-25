import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from './screens/ChatList';
import ChatScreen from './screens/ChatScreen';
import { initializeDatabase, addUser } from './db'; // Import database methods
import AddUser from './screens/AddUser'; // Import AddUser screen
import Questionnaire from './screens/Questionnaire'; // Import the Questionnaire screen
import Profile from './screens/Profile'; // Import Profile screen
import LoginScreen from './screens/LoginScreen';
import ProducerDataScreen from './screens/ProducerDataScreen'; // Import the new screen

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Initialize the database and add sample rows on app start
    initializeDatabase();
    addSampleUsers();
  }, []);

  const addSampleUsers = () => {
    const sampleUsers = [
      // { name: 'Alice', cpf: '123.456.789-00' },
      // { name: 'Bob', cpf: '987.654.321-00' },
      // { name: 'Charlie', cpf: '555.666.777-00' },
    ];

    sampleUsers.forEach(({ name, cpf }) => {
      addUser(name, cpf); // Add each sample user to the database
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Waraná-Seha" component={ChatList} />
      <Stack.Screen
        name="ProducerDataScreen"
        component={ProducerDataScreen}
        options={{ title: 'Producer Data Aggregation' }} // Set screen title
      />
        <Stack.Screen name="História" component={ChatScreen} />
        <Stack.Screen name="Cadastrar" component={AddUser} />
        <Stack.Screen name="Formulário" component={Questionnaire} />
        <Stack.Screen name="Perfil" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

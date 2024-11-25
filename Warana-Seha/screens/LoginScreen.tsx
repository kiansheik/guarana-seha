import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate("Waraná-Seha"); // Navigate to ChatList
  };

  const handleSignup = () => {
    alert('Sign Up not implemented');
  };

  return (
    <ImageBackground
      source={require('./assets/LoginBG.png')} // Ensure the image is in the `assets` folder
      style={styles.background}
    >
    <View style={styles.greenOverlay} />
      <View style={styles.overlay}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Waraná</Text>
          <Text style={styles.subtitle}>Seha</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#000"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Criar uma Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenOverlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire background
    backgroundColor: "#398153c7", // Slightly green and transparent
  },
  overlay: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 2, // Pushes title to the top
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -10, // Slight overlap between lines
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#000',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center', // Center the text
    width: '60%', // Keep inputs aligned with buttons
  },
  
  buttonContainer: {
    flex: 1, // Pushes buttons to the bottom
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30, // Adds spacing from the bottom of the screen
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

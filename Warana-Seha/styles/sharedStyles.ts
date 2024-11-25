// styles/sharedStyles.ts
import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B8E23',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export const colors = {
  primary: '#6B8E23',
  secondary: '#D3D3D3',
  background: '#F5F5F5',
  text: '#333',
};

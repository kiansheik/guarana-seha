import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    producerButton: {
      padding: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      marginRight: 10,
    },
    selectedButton: {
      backgroundColor: '#4caf50',
    },
    producerText: {
      fontSize: 16,
      color: '#fff',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20,
    },
    aggregationButton: {
      padding: 10,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      marginHorizontal: 5,
    },
    buttonText: {
      fontSize: 16,
      color: '#000',
    },
    chart: {
      marginTop: 20,
      borderRadius: 10,
    },
  });
  
export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  leftButton: {
    backgroundColor: '#4CAF50',
  },
  rightButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 80, // Add padding to avoid overlap with bottom buttons
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10, // Reduce padding to make it thinner
    paddingHorizontal: 12,
    marginBottom: 8, // Reduce margin between cards
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5, // Slimmer border width
    elevation: 1, // Reduce shadow for a lighter feel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16, // Slightly smaller title font
    fontWeight: '600', // Lighter font weight
    marginBottom: 2, // Reduce spacing below title
  },
  subtitle: {
    fontSize: 14, // Smaller subtitle font
    color: '#777', // Slightly lighter color
  },
  progress: {
    fontSize: 13, // Smaller progress font
    color: '#555',
    fontWeight: '500', // Lighter font weight
  },
  arrow: {
    fontSize: 20, // Slightly smaller arrow icon
    color: '#bbb',
    marginLeft: 10, // Reduce spacing from the content
  },
});

export default styles;

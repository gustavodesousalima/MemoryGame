import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  touchable: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  correct: {
    backgroundColor: '#d4edda',
  },
  incorrect: {
    backgroundColor: '#f8d7da',
  },
  emoji: {
    fontSize: 25,
  },
});

export default styles;
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Memória!</Text>
      <Button 
        title="Iniciar Jogo" 
        onPress={() => navigation.navigate('Game')} 
      />
      <Button 
        title="Ver Lista para Estudar Depois" 
        onPress={() => navigation.navigate('StudyList')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default HomeScreen;
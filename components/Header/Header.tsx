import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Jogo de Memória</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Header;
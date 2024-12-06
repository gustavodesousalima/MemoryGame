import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedCardsPage: React.FC = () => {
  const [savedCards, setSavedCards] = useState<{ concept: string; definition: string }[]>([]);

  useEffect(() => {
    const fetchSavedCards = async () => {
      const savedCardsData = await AsyncStorage.getItem('savedCards');
      if (savedCardsData) {
        setSavedCards(JSON.parse(savedCardsData));
      }
    };

    fetchSavedCards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cards para Estudos</Text>
      <FlatList
        data={savedCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}><Text style={styles.textdesc}>Tema: </Text> {item.concept}</Text>
            <Text style={styles.text}><Text style={styles.textdesc}>Definição: </Text> {item.definition}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ee9e5a',
    textAlign: 'center',
  },
  card: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#4393fb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  textdesc: {
    fontWeight: 'bold',
    color: '#FADF48',
  }
});

export default SavedCardsPage;
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
      <Text style={styles.title}>Saved Cards</Text>
      <FlatList
        data={savedCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Tema: {item.concept}</Text>
            <Text style={styles.text}>Definição: {item.definition}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default SavedCardsPage;

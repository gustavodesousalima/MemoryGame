import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/Header/Header';
import Grid from '../components/Grid/Grid';
import { cards } from '../data/Card';

const GameScreen = () => {
  const [gameCards, setGameCards] = useState(cards);

  const handleCardClick = (id: string) => {
  };

  const handleDoubleClick = (id: string) => {
  };

  return (
    <SafeAreaView style={styles.app}>
      <Header />
      <Grid cards={gameCards} onCardClick={handleCardClick} onDoubleClick={handleDoubleClick} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
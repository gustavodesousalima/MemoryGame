import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({ 
  id, 
  concept, 
  definition, 
  flipped, 
  onClick, 
  markedForStudy, 
  showConcept,
  onDoubleClick
}) => {
  const [lastClickTime, setLastClickTime] = useState(0);

  const handlePress = () => {
    const currentTime = Date.now();

    if (currentTime - lastClickTime < 500) {
      onDoubleClick(id);
    }

    setLastClickTime(currentTime);
    onClick(id);
  };

  return (
    <TouchableOpacity 
      style={[ 
        styles.card, 
        flipped ? styles.flipped : {}, 
        markedForStudy ? styles.marked : {}
      ]}
      onPress={handlePress}
    >
      <View style={styles.cardContent}>
        {flipped ? (
          <Text style={styles.cardText}>{showConcept ? concept : definition}</Text>
        ) : (
          <Text style={styles.cardTextatras}>?</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 95,
    height: 150,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fccb55',
    borderRadius: 8,
  },
  flipped: {
    backgroundColor: '#6997FA',
  },
  marked: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    padding: 4,
    fontWeight: 'bold',
  },
  cardTextatras: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Card;

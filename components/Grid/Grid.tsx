import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../Card/Card';
import { CardProps } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const allCards: CardProps[] = [
  { 
    id: '1', 
    concept: 'Closure', 
    definition: 'Uma função que tem acesso ao seu próprio escopo, ao escopo da função externa e ao escopo global.',
    flipped: false, 
    markedForStudy: false, 
    showConcept: true,
    onClick: () => {}, 
    content: '',
    onDoubleClick: () => {}
  },
  { 
    id: '2', 
    concept: 'Hoisting', 
    definition: 'O comportamento do JavaScript de mover declarações para o topo do seu escopo de execução.',
    flipped: false, 
    markedForStudy: false, 
    showConcept: true,
    onClick: () => {} ,
    content: '',
    onDoubleClick: () => {}
  },
  { 
    id: '3', 
    concept: 'Event Loop', 
    definition: 'A parte do JavaScript que coordena a execução de código, coleta de eventos e execução de sub-tarefas.',
    flipped: false, 
    markedForStudy: false, 
    showConcept: true,
    onClick: () => {} ,
    content: '',
    onDoubleClick: () => {}
  },
  { 
    id: '4', 
    concept: 'Callback', 
    definition: 'Uma função passada como argumento para outra função que é executada após o término de um processo.',
    flipped: false, 
    markedForStudy: false, 
    showConcept: true,
    onClick: () => {} ,
    content: '',
    onDoubleClick: () => {}
  },
  { 
    id: '5', 
    concept: 'Promise', 
    definition: 'Um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.',
    flipped: false, 
    markedForStudy: false, 
    showConcept: true, 
    onClick: () => {} ,
    content: '',
    onDoubleClick: () => {} 
  },
  { 
    id: '6', 
    concept: 'Event Handler', 
    definition: 'Uma função que é executada em resposta a um evento, como um clique ou envio de formulário.',
    flipped: false, 
    markedForStudy: false, 
    showConcept: true,
    onClick: () => {} ,
    content: '',
    onDoubleClick: () => {} 
  },
];

const shuffleCards = (cards: CardProps[]) => {
  const cardPairs = cards.flatMap(card => [
    { 
      ...card, 
      id: `${card.id}-concept`, 
      content: card.concept || '', 
      type: 'concept', 
      showConcept: true, 
      onClick: () => {} 
    },
    { 
      ...card, 
      id: `${card.id}-definition`, 
      content: card.definition || '', 
      type: 'definition', 
      showConcept: false, 
      onClick: () => {} 
    },
  ]);

  
  for (let i = cardPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
  }
  return cardPairs;
};


interface GridProps {
  cards: CardProps[];

  onCardClick: (id: string) => void;

  onDoubleClick: (id: string) => void;

}

const Grid: React.FC<GridProps> = ({ onCardClick, onDoubleClick }) => {



  const [stateCards, setStateCards] = useState<CardProps[]>(shuffleCards(allCards));
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timer, setTimer] = useState(180);
  const [gameOver, setGameOver] = useState(false);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);

  const handleCardClick = async (id: string) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id)) return;
  
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
  
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = stateCards.find(card => card.id === firstId);
      const secondCard = stateCards.find(card => card.id === secondId);
  
      if (firstCard && secondCard && firstCard.id.split('-')[0] === secondCard.id.split('-')[0]) {
        setMatches(prev => prev + 1);
        setScore(prev => prev + 10);
        setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setScore(prev => prev - 2);
        }, 1000);
      }
    }
  };

  const handleDoubleClick = async (id: string) => {
    const card = stateCards.find(card => card.id === id);
    if (card) {
      
      const savedCards = await AsyncStorage.getItem('savedCards');
      const cardsArray = savedCards ? JSON.parse(savedCards) : [];

      if (!cardsArray.some((item: { id: string; }) => item.id === card.id)) {
        cardsArray.push({
          concept: card.concept,
          definition: card.definition,
        });
        await AsyncStorage.setItem('savedCards', JSON.stringify(cardsArray));
      }
    }
  };

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.statusText}>Score: {score}</Text>
        <Text style={styles.statusText}>Matches: {matches}</Text>
        <Text style={styles.statusText}>Time: {timer}s</Text>
      </View>
      <View style={styles.grid}>
        {stateCards.map(card => (
          <Card
            key={card.id}
            {...card}
            onClick={() => handleCardClick(card.id)}
            onDoubleClick={handleDoubleClick}
            flipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
            content={card.content}
            showConcept={card.showConcept}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 50,
  },
});

export default Grid;

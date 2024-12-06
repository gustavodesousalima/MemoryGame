import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const [timer, setTimer] = useState(180); // 3 minutos
  const [gameOver, setGameOver] = useState(false);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [initialFlip, setInitialFlip] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Temporizador principal (apenas uma instância do interval)
  useEffect(() => {
    if (gameOver || timer === 0) return; // Não faz nada se o jogo acabou ou o tempo acabou

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000); // 1 segundo de intervalo

    return () => clearInterval(interval); // Limpa o interval quando o componente for desmontado
  }, [timer, gameOver]);

  // Mostrar todas as cartas inicialmente por 15 segundos
  useEffect(() => {
    if (initialFlip) {
      const flipTimer = setTimeout(() => setInitialFlip(false), 15000);
      return () => clearTimeout(flipTimer);
    }
  }, [initialFlip]);

  useEffect(() => {
    if (timer === 0 || matches === allCards.length / 2) {
      setGameOver(true);
      setShowModal(true); // Exibe o pop-up
    }
  }, [timer, matches]);

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

  const handleCardClick = async (id: string) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || matchedCards.includes(id) || initialFlip || gameOver) return;

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

  const restartGame = () => {
    setStateCards(shuffleCards(allCards));
    setFlippedCards([]);
    setScore(0);
    setMatches(0);
    setTimer(180);
    setMatchedCards([]);
    setGameOver(false);
    setShowModal(false);
  };

  const navigation = useNavigation<any>();

  const goToHome = () => {
    navigation.navigate('CodeCraft');
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>O Tempo Acabou! Score: {score}</Text>
              <TouchableOpacity style={styles.button} onPress={goToHome}>
                <Text style={styles.buttonText}>Voltar para a Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={restartGame}>
                <Text style={styles.buttonText}>Reiniciar Jogo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <>
          <View style={styles.status}>
            <Text style={styles.statusText}>Score: {score}</Text>
            <Text style={styles.statusText}>Time: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</Text>
          </View>
          <View style={styles.grid}>
            {stateCards.map(card => (
              <Card
                key={card.id}
                {...card}
                onClick={() => handleCardClick(card.id)}
                onDoubleClick={handleDoubleClick}
                flipped={initialFlip || flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                content={card.content}
                showConcept={card.showConcept}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
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
    width: '100%',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4393fb',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Grid;

import { useState, useEffect } from 'react';
import { GameState, Player, GameAnswers, ValidationResults } from '../types/game.types';

const calculateScore = (
  answers: GameAnswers,
  validationResults: ValidationResults,
  timeBonus: number,
  duplicateWords: { [word: string]: string[] }
): number => {
  let totalScore = 0;
  
  Object.entries(answers).forEach(([category, answer]) => {
    if (validationResults[category as keyof ValidationResults]) {
      const isDuplicate = duplicateWords[answer.toLowerCase()]?.length > 1;
      // Half points if the word is duplicate
      const multiplier = isDuplicate ? 0.5 : 1;
      
      // Base points for valid answer
      totalScore += 10 * multiplier;
      // Additional points for word length
      totalScore += answer.length * multiplier;
    }
  });

  // Bonus points if all answers are valid
  if (Object.values(validationResults).every(result => result)) {
    totalScore += 10;
  }

  // Time bonus
  totalScore += timeBonus;

  return totalScore;
};

export const useGameState = (playerId: string) => {
  const [gameState, setGameState] = useState<GameState>({
    id: '',
    status: 'waiting',
    currentLetter: '',
    timeRemaining: 60,
    players: {},
    duplicateWords: {},
  });

  useEffect(() => {
    // Subscribe to game state changes
    // This would be implemented with your chosen backend solution (Firebase, WebSocket, etc.)
  }, []);

  const startGame = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      currentLetter: randomLetter,
      timeRemaining: 60,
      startTime: Date.now(),
    }));
  };

  const submitAnswers = (answers: GameAnswers) => {
    const player = gameState.players[playerId];
    const finishTime = Date.now() - (gameState.startTime || 0);
    
    // Update duplicate words tracking
    const newDuplicateWords = { ...gameState.duplicateWords };
    Object.values(answers).forEach(answer => {
      const lowerAnswer = answer.toLowerCase();
      if (!newDuplicateWords[lowerAnswer]) {
        newDuplicateWords[lowerAnswer] = [];
      }
      newDuplicateWords[lowerAnswer].push(playerId);
    });

    // Validate answers
    const validationResults = validateAnswers(answers, gameState.currentLetter);
    
    // Calculate score including duplicate word penalties
    const timeBonus = Math.max(0, 60 - Math.floor(finishTime / 1000));
    const score = calculateScore(answers, validationResults, timeBonus, newDuplicateWords);

    // Update player's results
    setGameState(prev => ({
      ...prev,
      players: {
        ...prev.players,
        [playerId]: {
          ...player,
          answers,
          score,
          validationResults,
          finishTime,
        },
      },
      duplicateWords: newDuplicateWords,
    }));
  };

  const validateAnswers = (answers: GameAnswers, currentLetter: string): ValidationResults => {
    const results: ValidationResults = {
      name: false,
      place: false,
      animal: false,
      thing: false,
    };

    Object.entries(answers).forEach(([category, answer]) => {
      const isValid = answer.length >= 2 && 
                     answer.trim().toUpperCase().startsWith(currentLetter);
      results[category as keyof ValidationResults] = isValid;
    });

    return results;
  };

  return {
    gameState,
    startGame,
    submitAnswers,
  };
};

export default useGameState;
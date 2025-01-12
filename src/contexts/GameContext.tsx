import React, { createContext, useContext, useState } from 'react';
import { Game, Answer } from '../types/API';

interface GameContextType {
  currentGame: Game | null;
  setCurrentGame: (game: Game | null) => void;
  gameState: 'lobby' | 'playing' | 'finished';
  setGameState: (state: 'lobby' | 'playing' | 'finished') => void;
  currentRound: number;
  setCurrentRound: (round: number) => void;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

const GameContext = createContext<GameContextType>({
  currentGame: null,
  setCurrentGame: () => {},
  gameState: 'lobby',
  setGameState: () => {},
  currentRound: 1,
  setCurrentRound: () => {},
  answers: [],
  setAnswers: () => {}
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'finished'>('lobby');
  const [currentRound, setCurrentRound] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);

  return (
    <GameContext.Provider
      value={{
        currentGame,
        setCurrentGame,
        gameState,
        setGameState,
        currentRound,
        setCurrentRound,
        answers,
        setAnswers
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
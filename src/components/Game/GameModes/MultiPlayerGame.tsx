import React from 'react';
import { GameContainer } from '../GameContainer';
import { useGameState } from '../../../hooks/useGameState';
import { GameMode } from '../../../types/game.types';

const MultiPlayerGame: React.FC = () => {
  const {
    gameState,
    startGame,
    submitAnswers,
    endGame,
    joinGame,
    leaveGame
  } = useGameState(GameMode.MULTI);

  return (
    <GameContainer
      mode={GameMode.MULTI}
      gameState={gameState}
      onStart={startGame}
      onSubmit={submitAnswers}
      onEnd={endGame}
      onJoin={joinGame}
      onLeave={leaveGame}
    />
  );
};

export default MultiPlayerGame;
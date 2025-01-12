import React, { useState, useEffect } from 'react';
import { GameContainer } from '../GameContainer';
import { useGameState } from '../../../hooks/useGameState';
import { GameMode, GameStatus } from '../../../types/game.types';

const SinglePlayerGame: React.FC = () => {
  const {
    gameState,
    startGame,
    submitAnswers,
    endGame
  } = useGameState(GameMode.SINGLE);

  return (
    <GameContainer
      mode={GameMode.SINGLE}
      gameState={gameState}
      onStart={startGame}
      onSubmit={submitAnswers}
      onEnd={endGame}
    />
  );
};

export default SinglePlayerGame;
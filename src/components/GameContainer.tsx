import { useState, useEffect } from 'react';
import Timer from './Timer/Timer';
import InputForm from './InputForm';
import ScoreDisplay from './ScoreDisplay';
import GameHeader from './Game/GameHeader';

import { GameAnswers, ValidationResults, GameStatus, GameMode, GameState } from '../types/game.types';

interface GameContainerProps {
  mode: GameMode;
  gameState: GameState;
  onStart: () => void;
  onSubmit: (answers: GameAnswers) => void;
  onEnd: () => void;
  onJoin?: (gameId: string) => void;
  onLeave?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  mode,
  gameState,
  onStart,
  onSubmit,
  onEnd,
  onJoin,
  onLeave
}) => {
  if (!gameState) return null;

  const { currentLetter, timeRemaining, status: gameStatus, answers, score, validationResults, players } = gameState || {};

  const handleStart = () => {
    onStart();
  };

  const handleSubmit = (submittedAnswers: GameAnswers) => {
    onSubmit(submittedAnswers);
  };

  // Timer is now handled by useGameTimer hook in useGameState

  return (
    <div className="game-container">
      {gameStatus === 'waiting' && (
        <div className="start-screen">
          <h2>Welcome to Name, Place, Animal, Thing!</h2>
          <p>
            You'll be given a random letter and 60 seconds to come up with:
            <ul>
              <li>A person's name</li>
              <li>A place</li>
              <li>An animal</li>
              <li>A thing</li>
            </ul>
            All answers must start with the given letter!
          </p>
          <button className="submit-button" onClick={handleStart}>
            Start Game
          </button>
        </div>
      )}

      {gameStatus === 'playing' && (
        <div className="game-screen">
          <GameHeader
            mode={mode}
            status={gameStatus}
            currentLetter={currentLetter}
            timeRemaining={timeRemaining}
            playerCount={players?.length}
          />
          {mode === GameMode.SINGLE && (
            <Timer timeRemaining={timeRemaining || 0} isActive={true} />
          )}
          <InputForm
            currentLetter={currentLetter}
            onSubmit={handleSubmit}
            disabled={false}
          />
        </div>
      )}

      {gameStatus === 'finished' && (
        <div className="end-screen">
          <ScoreDisplay
            answers={answers}
            score={score}
            validationResults={validationResults}
          />
          <button className="submit-button" onClick={handleStart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
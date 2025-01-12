import React from 'react';
import { GameMode, GameStatus } from '../../types/game.types';

interface GameHeaderProps {
  mode: GameMode;
  status: GameStatus;
  currentLetter: string;
  timeRemaining?: number;
  playerCount?: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  mode,
  status,
  currentLetter,
  timeRemaining,
  playerCount
}) => {
  return (
    <div className="game-header">
      <div className="game-info">
        <h2>
          {mode === GameMode.SINGLE ? 'Single Player' : 'Multiplayer'} Game
          {playerCount !== undefined && ` - ${playerCount} Players`}
        </h2>
        {status === 'playing' && (
          <div className="current-letter">
            <h3>Letter: {currentLetter}</h3>
            {mode === GameMode.SINGLE && timeRemaining !== undefined && (
              <div className="time-remaining">
                Time: {timeRemaining}s
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
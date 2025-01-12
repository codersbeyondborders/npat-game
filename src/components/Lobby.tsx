import React, { useState, useEffect } from 'react';
import { Player, GameState } from '../types/game.types';

interface LobbyProps {
  gameState: GameState;
  currentPlayer: Player;
  onPlayerReady: () => void;
  onStartGame: () => void;
}

const Lobby: React.FC<LobbyProps> = ({
  gameState,
  currentPlayer,
  onPlayerReady,
  onStartGame,
}) => {
  const [canStartGame, setCanStartGame] = useState(false);

  useEffect(() => {
    const allPlayersReady = Object.values(gameState.players).every(
      (player) => player.isReady
    );
    const hasMinimumPlayers = Object.keys(gameState.players).length >= 2;
    setCanStartGame(allPlayersReady && hasMinimumPlayers);
  }, [gameState.players]);

  return (
    <div className="lobby">
      <h2>Game Lobby</h2>
      <div className="players-list">
        <h3>Players</h3>
        {Object.values(gameState.players).map((player) => (
          <div
            key={player.id}
            className={`player-item ${player.isReady ? 'ready' : 'not-ready'}`}
          >
            <span className="player-name">{player.name}</span>
            <span className="player-status">
              {player.isReady ? '✓ Ready' : 'Waiting...'}
            </span>
          </div>
        ))}
      </div>

      <div className="lobby-actions">
        {!currentPlayer.isReady && (
          <button
            className="ready-button"
            onClick={onPlayerReady}
          >
            I'm Ready
          </button>
        )}

        {canStartGame && currentPlayer.isReady && (
          <button
            className="start-game-button"
            onClick={onStartGame}
          >
            Start Game
          </button>
        )}

        <div className="lobby-info">
          {!canStartGame && (
            <p className="waiting-message">
              Waiting for {Object.keys(gameState.players).length < 2
                ? 'more players'
                : 'all players to be ready'}...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
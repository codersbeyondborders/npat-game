import React, { useState } from 'react';
import { GameMode } from '../../types/game.types';

interface GameLobbyProps {
  onJoinGame: (gameId: string) => void;
  onCreateGame: () => void;
  onCancel: () => void;
  availableGames?: Array<{
    id: string;
    playerCount: number;
    maxPlayers: number;
  }>;
}

const GameLobby: React.FC<GameLobbyProps> = ({
  onJoinGame,
  onCreateGame,
  onCancel,
  availableGames = []
}) => {
  const [gameId, setGameId] = useState('');

  const handleJoin = () => {
    if (gameId) {
      onJoinGame(gameId);
    }
  };

  return (
    <div className="game-lobby">
      <div className="lobby-header">
        <h2>Multiplayer Game Lobby</h2>
        <button onClick={onCancel} className="cancel-button">
          Back
        </button>
      </div>

      <div className="lobby-content">
        <div className="create-game">
          <h3>Create New Game</h3>
          <button onClick={onCreateGame} className="create-button">
            Create Game
          </button>
        </div>

        <div className="join-game">
          <h3>Join Existing Game</h3>
          {availableGames.length > 0 ? (
            <div className="game-list">
              {availableGames.map(game => (
                <div key={game.id} className="game-item">
                  <span>Game {game.id}</span>
                  <span>{game.playerCount}/{game.maxPlayers} players</span>
                  <button
                    onClick={() => onJoinGame(game.id)}
                    className="join-button"
                    disabled={game.playerCount >= game.maxPlayers}
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No available games found.</p>
          )}
        </div>

        <div className="join-by-id">
          <h3>Join by Game ID</h3>
          <div className="input-group">
            <input
              type="text"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder="Enter Game ID"
              className="game-id-input"
            />
            <button
              onClick={handleJoin}
              disabled={!gameId}
              className="join-button"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
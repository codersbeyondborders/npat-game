import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listGames } from '../graphql/queries';
import { createGame } from '../graphql/mutations';
import { Game } from '../types/API';
import { useAuth } from '../contexts/AuthContext';

const client = generateClient();

const GameLobby: React.FC<{
  onGameJoin: (gameId: string) => void;
}> = ({ onGameJoin }) => {
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const result = await client.graphql({
        query: listGames,
        variables: {
          filter: {
            status: { eq: 'WAITING' }
          }
        }
      });
      setAvailableGames(result.data.listGames.items);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const createNewGame = async () => {
    try {
      const result = await client.graphql({
        query: createGame,
        variables: {
          input: {
            mode: 'MULTI',
            status: 'WAITING',
            currentRound: 1,
            maxPlayers: 4,
            timeLimit: 60,
            createdBy: user?.username
          }
        }
      });
      onGameJoin(result.data.createGame.id);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <div className="game-lobby">
      <h2>Game Lobby</h2>
      <button onClick={createNewGame}>Create New Game</button>
      
      <div className="available-games">
        <h3>Available Games</h3>
        {availableGames.length === 0 ? (
          <p>No games available. Create one!</p>
        ) : (
          <ul>
            {availableGames.map((game) => (
              <li key={game.id}>
                <span>Game #{game.id.slice(0, 8)}</span>
                <span>Players: {game.players?.length || 0}/{game.maxPlayers}</span>
                <button onClick={() => onGameJoin(game.id)}>Join Game</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameLobby;
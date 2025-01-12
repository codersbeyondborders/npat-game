import React from 'react';
import { LeaderboardEntry } from '../types/game.types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Games Won</th>
              <th>Games Played</th>
              <th>Avg Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.sort((a, b) => b.score - a.score).map((entry, index) => (
              <tr key={entry.playerId} className={index < 3 ? `top-${index + 1}` : ''}>
                <td>{index + 1}</td>
                <td>{entry.playerName}</td>
                <td>{entry.score}</td>
                <td>{entry.gamesWon}</td>
                <td>{entry.gamesPlayed}</td>
                <td>{entry.averageScore.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
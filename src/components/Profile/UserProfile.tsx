import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  highScore: number;
  averageScore: number;
  totalLevelsCompleted: number;
}

interface UserProfileProps {
  stats: UserStats;
  onSignOut: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ stats, onSignOut }) => {
  const { user } = useAuth();

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2 className="text-2xl font-bold">Profile: {user?.username}</h2>
        <button onClick={onSignOut} className="signout-button">
          Sign Out
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Games Played</div>
          <div className="stat-value">{stats.gamesPlayed}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Games Won</div>
          <div className="stat-value">{stats.gamesWon}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">High Score</div>
          <div className="stat-value">{stats.highScore}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Score</div>
          <div className="stat-value">{stats.averageScore.toFixed(1)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Levels Completed</div>
          <div className="stat-value">{stats.totalLevelsCompleted}</div>
        </div>
      </div>

      <div className="progress-section">
        <h3 className="text-xl font-semibold mb-4">Level Progress</h3>
        <div className="level-grid">
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
            <div
              key={letter}
              className={`level-indicator ${
                stats.totalLevelsCompleted >= letter.charCodeAt(0) - 64
                  ? 'completed'
                  : ''
              }`}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
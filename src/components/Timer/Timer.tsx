import React from 'react';

interface TimerProps {
  timeRemaining: number;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining, isActive }) => {
  const getColor = () => {
    if (timeRemaining <= 10) return 'text-red-600';
    if (timeRemaining <= 30) return 'text-orange-500';
    return 'text-green-600';
  };

  return (
    <div className={`timer ${isActive ? 'active' : ''}`}>
      <div className={`time-display ${getColor()}`}>
        <span className="countdown-number">{timeRemaining}</span>
        <span className="countdown-label">seconds</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(timeRemaining / 60) * 100}%`,
            backgroundColor: timeRemaining <= 10 ? '#dc2626' : 
                           timeRemaining <= 30 ? '#f97316' : '#16a34a'
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
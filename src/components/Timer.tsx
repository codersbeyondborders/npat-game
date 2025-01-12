interface TimerProps {
  timeRemaining: number;
  isActive: boolean;
}

const Timer = ({ timeRemaining, isActive }: TimerProps) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`timer ${isActive ? 'active' : ''}`}>
      <div className="timer-display">{formatTime(timeRemaining)}</div>
      <div className="timer-label">Time Remaining</div>
    </div>
  );
};

export default Timer;
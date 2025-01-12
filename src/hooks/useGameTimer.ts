import { useState, useEffect, useCallback } from 'react';
import { GameMode } from '../types/game.types';

interface UseGameTimerProps {
  initialTime: number;
  mode: GameMode;
  isPlaying: boolean;
  onTimeUp: () => void;
}

export const useGameTimer = ({
  initialTime,
  mode,
  isPlaying,
  onTimeUp
}: UseGameTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    let timer: number;

    if (isPlaying && mode === GameMode.SINGLE && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying, mode, timeRemaining, onTimeUp]);

  const resetTimer = useCallback(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  return {
    timeRemaining,
    resetTimer
  };
};
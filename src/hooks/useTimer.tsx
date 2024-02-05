import { useGameStore } from "@/lib/stores/gameStore";
import { useCallback, useEffect, useState } from "react";

export interface GameTimer {
  timeToDisplay: number;
  startTimer: () => void;
  cancelTimer: { (): void } | null;
  resetTimer: () => void;
}

interface Timer {
  cancel: { (): void };
}

/**
 * Hook to manage global game timer
 * - start, end, cancel, reset
 */
export const useTimer = (): GameTimer => {
  const { gameTime, setIsGameInProgress, setIsGameEnded } = useGameStore();
  const [timeToDisplay, setTimeToDisplay] = useState(gameTime);
  const [gameTimer, setGameTimer] = useState<Timer | null>(null);
  let currentTime = gameTime;

  const startTimer = () => {
    setIsGameInProgress(true);
    currentTime = gameTime;

    let timer = accurateTimer(() => {
      currentTime--;
      setTimeToDisplay(currentTime);

      if (currentTime <= 0) {
        timer.cancel();
      }
    }, 1000);

    setGameTimer(timer);
  };

  const accurateTimer = (fn: () => void, time = 1000) => {
    let nextAt = new Date().getTime() + time;
    let timeout: NodeJS.Timeout;

    const wrapper = () => {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());

      fn();
    };

    const cancel = () => {
      setIsGameInProgress(false);
      setIsGameEnded(true);
      clearTimeout(timeout);
    };

    timeout = setTimeout(wrapper, nextAt - new Date().getTime());

    return { cancel };
  };

  const resetTimer = useCallback(() => {
    setTimeToDisplay(gameTime);
  }, [gameTime]);

  useEffect(() => {
    resetTimer();
  }, [gameTime, resetTimer]);

  return {
    timeToDisplay,
    startTimer,
    cancelTimer: gameTimer ? gameTimer.cancel : null,
    resetTimer,
  };
};

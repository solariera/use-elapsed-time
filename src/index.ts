import { useState, useEffect, useRef, useCallback } from 'react';

type Millisecond = number;

type Oprions = {
  start?: Date;
  interval?: Millisecond;
};

type ElapsedTimeReturns = {
  elapsedTime: Millisecond;
  pause: () => void;
  restart: () => void;
  clear: () => void;
  isWorking: () => boolean;
};

const useElapsedTime = (options: Oprions): ElapsedTimeReturns => {
  const { start = new Date(), interval = 200 } = options;

  const [latestDate, setLatestDate] = useState(start.getTime());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [workingEnable, setWorkingEnable] = useState(true);

  const counterRef = useRef<() => number>();
  const timeoutIdRef = useRef<number>();

  const startCounter = (): number => {
    return window.setTimeout(() => {
      const now = Date.now();
      const diff = now - latestDate;
      setElapsedTime((prev) => prev + diff);
      setLatestDate(now);
    }, interval);
  };

  useEffect(() => {
    if (!workingEnable) return;
    const count = startCounter;
    counterRef.current = count;
    timeoutIdRef.current = count();
    return () => clearTimeout(timeoutIdRef.current);
  }, [latestDate, elapsedTime]);

  const pause = (): void => {
    if (!workingEnable) return;
    clearTimeout(timeoutIdRef.current);
    setWorkingEnable(false);
  };

  const restart = (): void => {
    if (workingEnable) return;
    setLatestDate(Date.now());
    counterRef.current;
    setWorkingEnable(true);
  };

  const clear = (): void => {
    setElapsedTime(0);
    setLatestDate(Date.now());
  };

  const isWorking = useCallback((): boolean => workingEnable, [workingEnable]);

  return { elapsedTime, pause, restart, clear, isWorking };
};

export { useElapsedTime };

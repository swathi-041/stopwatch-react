import React, { useState, useEffect, useRef } from 'react';
import './stopwatch.css';

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [isReady, setReady] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isReady) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    // Cleanup function to clear the interval
    return () => clearInterval(intervalRef.current);
  }, [isReady]);

  function handleStart() {
    if (!isReady) {
      setReady(true);
    }
  }

  function handleStop() {
    if (isReady) {
      setReady(false);
    }
  }

  function handleReset() {
    setTimer(0);
    setReady(false);
  }

  const hours = Math.floor(timer / 360000);
  const minutes = Math.floor((timer % 360000) / 6000);
  const seconds = Math.floor((timer % 6000) / 100);
  const milliseconds = timer % 100;

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-time">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </h1>
      <div className="stopwatch-buttons">
        <button
          onClick={handleStart}
          disabled={isReady}
          className={`stopwatch-button ${isReady ? '' : 'active'}`}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isReady}
          className={`stopwatch-button ${isReady ? 'active' : ''}`}
        >
          Stop
        </button>
        <button onClick={handleReset} className="stopwatch-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;

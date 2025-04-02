'use client'
import { useState, useEffect } from "react";

const TIMER_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds
const START_TIME = new Date("2025-04-01T00:00:00Z").getTime(); // Fixed UTC start time

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  function getTimeLeft() {
    const now = Date.now();
    const elapsed = (now - START_TIME) % TIMER_DURATION; // Time since last full cycle
    return TIMER_DURATION - elapsed; // Remaining time in current cycle
  }

  function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      <h1>Global 48-Hour Timer</h1>
      <h2>{formatTime(timeLeft)}</h2>
    </div>
  );
};

export default CountdownTimer;
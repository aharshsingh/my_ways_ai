import React, { useState, useEffect } from "react";

const CountdownTimer = ({ handleNextQuestion, initialMinutes, initialSeconds = 0 }) => {
  const totalInitialSeconds = initialMinutes * 60 + initialSeconds;
  const [timeLeft, setTimeLeft] = useState(totalInitialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-white text-3xl rounded-2xl bg-[#606dd3] flex items-center justify-center font-medium w-[15%] border px-2 pb-1">
      <span className="pt-1 px-1">{String(minutes).padStart(2, "0")}</span>
      <span>:</span>
      <span className="pt-1 px-1">{String(seconds).padStart(2, "0")}</span>
    </div>
  );
};

export default CountdownTimer;

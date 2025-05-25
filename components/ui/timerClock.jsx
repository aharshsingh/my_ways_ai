import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes, initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timerInterval);
        } else {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [minutes, seconds]);

  return (
    <div className="text-white text-3xl rounded-2xl bg-[#606dd3] flex items-center justify-center font-medium w-[15%] border p-2">
      {`${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`}
    </div>
  );
};

export default CountdownTimer;

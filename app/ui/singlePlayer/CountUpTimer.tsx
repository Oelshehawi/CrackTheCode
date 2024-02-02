import { useState, useEffect } from 'react';

const CountUpTimer = () => {
  const [time, setTime] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60); 
  const seconds = time % 60; 

  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return (
    <div>
      Timer: {formattedMinutes}:{formattedSeconds}
    </div>
  );
};

export default CountUpTimer;

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { KeyIcon } from '@heroicons/react/16/solid'; // Ensure correct import path

export default function CodeInput() {
  const [guess, setGuess] = useState('');
  const controls = useAnimation();

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  const handleSubmit = () => {
    if (guess.length !== 4) {
      controls.start('shake');
    } else {
      // Handle valid guess logic here
      console.log(guess);
      setGuess('');
    }
  };

  return (
    <div className="flex justify-center items-center m-4">
      <motion.input
        initial="hidden"
        animate="visible"
        variants={inputVariants}
        transition={{ duration: 0.5 }}
        className="bg-white rounded p-2 shadow-lg text-blue font-bold outline-none"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={guess}
        onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, ''))}
        placeholder="Enter your guess..."
      />
      <button onClick={handleSubmit} className="ml-2 p-2 bg-blue rounded shadow flex items-center justify-center animate-bounce">
        <KeyIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

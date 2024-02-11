
import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { KeyIcon } from '@heroicons/react/16/solid'; // Ensure correct import path

interface CodeInputProps {
  guess: string;
  setGuess: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export default function CodeInput({
  guess,
  setGuess,
  handleSubmit,
  disabled,
}: CodeInputProps) {
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    invalid: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } },
  };

  const isValidGuess = guess.length === 4 && /^\d{4}$/.test(guess);

  return (
    <form onSubmit={handleSubmit} className='flex justify-center items-center m-4 pb-4'>
      <motion.input
        animate={isValidGuess ? 'visible' : 'invalid'}
        variants={inputVariants}
        transition={{ duration: 0.5 }}
        className='bg-white rounded p-2 shadow-lg text-blue font-bold outline-none'
        type='text'
        inputMode='numeric'
        value={guess}
        onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
        placeholder='Enter your guess...'
        required
      />
      <motion.button
        type='submit'
     
        whileHover={{ scale: isValidGuess ? 1.1 : 1 }}
        whileTap={{ scale: isValidGuess ? 0.9 : 1 }}
        className={`ml-1 p-2 bg-blue rounded shadow flex items-center justify-center ${!isValidGuess ? 'opacity-50 cursor-not-allowed' : 'animate-bounce'}`}
        disabled={!isValidGuess || disabled}
      >
        <KeyIcon className='h-6 w-6 text-white' />
      </motion.button>
    </form>
  );
}
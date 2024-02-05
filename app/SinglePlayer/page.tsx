'use client';
import { useState, useEffect } from 'react';
import FadeTransition from '../ui/FadeTransition';
import AnimatedText from '../ui/AnimatedText';
import PreviousGuessList from '../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../ui/singlePlayer/CodeInput';
import Header from '../ui/singlePlayer/Header';
import { createCode, checkGuess } from '@/lib/data';

export default function SinglePlayer() {
  const [code, setCode] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guess, setGuess] = useState<string>('');

  useEffect(() => {
    setCode(createCode());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuesses((prev) => [...prev, guess]);

    if (checkGuess(guess, code) === true) {
      console.log(guess);
      // Handle correct guess logic
    }

    setGuess('');
  };

  return (
    <FadeTransition>
      <div className='flex flex-col h-screen'>
        <Header />
        <div className='flex flex-col flex-grow justify-center items-center'>
          <AnimatedText text='Welcome to Single Player Mode!' />
          <PreviousGuessList guesses={guesses} />
        </div>
        <div className='pb-4 z-20'>
          <CodeInput
            guess={guess}
            setGuess={setGuess}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </FadeTransition>
  );
}

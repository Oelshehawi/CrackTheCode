'use client';
import { useState, useEffect } from 'react';
import { Status } from '@/lib/definitions';
import FadeTransition from '../ui/FadeTransition';
import AnimatedText from '../ui/AnimatedText';
import PreviousGuessList from '../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../ui/singlePlayer/CodeInput';
import Header from '../ui/singlePlayer/Header';
import { createCode, checkGuess } from '@/lib/data';

interface Guess {
  value: string;
  status: Status;
}

export default function SinglePlayer() {
  const [code, setCode] = useState<string>('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [guess, setGuess] = useState<string>('');
  const [status, setStatus] = useState<Status>('none');

  useEffect(() => {
    setCode(createCode());
  }, []);

  console.log(code)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentStatus = checkGuess(guess, code); 
    setGuesses((prev) => [...prev, { value: guess, status: currentStatus }]);
    setStatus(currentStatus); 
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

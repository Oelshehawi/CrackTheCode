'use client';
import { useState, useEffect } from 'react';
import { Status } from '@/lib/definitions';
import FadeTransition from '../ui/FadeTransition';
import AnimatedText from '../ui/AnimatedText';
import PreviousGuessList from '../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../ui/singlePlayer/CodeInput';
import Header from '../ui/singlePlayer/Header';
import { createCode, checkGuess } from '@/lib/data';
import RulesModal from '../ui/singlePlayer/RulesModal';

interface Guess {
  value: string;
  status: Status;
}

export default function SinglePlayer() {
  const [open, setOpen] = useState(false)
  const [guessesCounter, setGuessesCounter] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [guess, setGuess] = useState<string>('');

  useEffect(() => {
    setCode(createCode());
  }, []);

  console.log(code)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentStatus = checkGuess(guess, code); 
    setGuesses((prev) => [...prev, { value: guess, status: currentStatus }]);
    setGuess('');
    setGuessesCounter((prev) => prev + 1)
  };
  

  return (
    <FadeTransition>
      <RulesModal open={open}/>
      <div className='flex flex-col h-screen'>
        <Header guessesCounter={guessesCounter} setOpen={setOpen} open={open}/>
        <div className='flex flex-col flex-grow justify-center items-center overflow-hidden'>
          <AnimatedText text='Welcome to Single Player Mode!' />
          <PreviousGuessList guesses={guesses} />
        </div>
          <CodeInput
            guess={guess}
            setGuess={setGuess}
            handleSubmit={handleSubmit}
          />
      </div>
    </FadeTransition>
  );
}

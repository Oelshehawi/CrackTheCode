'use client';
import { useState, useEffect } from 'react';
import FadeTransition from '../ui/FadeTransition';
import AnimatedText from '../ui/AnimatedText';
import PreviousGuessList from '../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../ui/singlePlayer/CodeInput';
import Header from '../ui/singlePlayer/Header';
import { createCode, checkGuess } from '@/lib/data';

export default function SinglePlayer() {
  const [code, setCode] = useState<number[]>([]);
  const [guess, setGuess] = useState<number[]>([]);

  useEffect(() => {
    setCode(createCode());
  }, []);

  useEffect(() => {
    if (checkGuess(guess) === true) {
      // Handle correct guess logic
    }
  }, [guess]);

  return (
    <FadeTransition>
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-col flex-grow justify-center items-center'>
        <AnimatedText text='Welcome to Single Player Mode!' />
        <PreviousGuessList />
      </div>
      <div className='pb-4 z-20'>
        <CodeInput />
      </div>
    </div>
  </FadeTransition>
  );
  }
import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import CountUpTimer from './CountUpTimer';

export default function Header() {
  const [guessesCounter, setGuessesCounter] = useState<number>(0);

  return (
    <div className='flex flex-row md:justify-evenly justify-between m-4'>
      <p>Guesses: {guessesCounter}</p>
      <CountUpTimer />
      <QuestionMarkCircleIcon className='h-6 w-6 animate-bloop' />
    </div>
  );
}

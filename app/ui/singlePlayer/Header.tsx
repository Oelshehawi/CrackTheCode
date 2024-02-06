import { SetStateAction, Dispatch } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import CountUpTimer from './CountUpTimer';

interface HeaderProps {
  guessesCounter: number
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

export default function Header({guessesCounter, setOpen, open} : HeaderProps) {

  return (
    <div className='flex flex-row md:justify-evenly justify-between m-4'>
      <p>Guesses: {guessesCounter}</p>
      <CountUpTimer />
      <QuestionMarkCircleIcon onClick={() => setOpen(!open)} className='h-6 w-6 animate-bloop cursor-pointer' />
    </div>
  );
}

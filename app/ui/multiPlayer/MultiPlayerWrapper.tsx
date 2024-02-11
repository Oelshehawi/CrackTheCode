import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { AblyProvider, useChannel } from 'ably/react';
import FadeTransition from '../ui/../animations/FadeTransition';
import AnimatedText from '../ui/../animations/AnimatedText';
import PreviousGuessList from '../../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../../ui/singlePlayer/CodeInput';
import Header from '../../ui/singlePlayer/Header';
import { Status } from '@/lib/definitions';

const client = new Ably.Realtime.Promise({
  authUrl: '/api/Ably',
  authMethod: 'POST',
});

interface Guess {
  value: string;
  status: Status;
}

export default function MultiPlayerWrapper() {
  return (
    <AblyProvider client={client}>
      <MultiPlayer />
    </AblyProvider>
  );
}

function MultiPlayer() {
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [guess, setGuess] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [guessesCounter, setGuessesCounter] = useState<number>(0);

  const { channel } = useChannel('player-turn', (message) => {
    if (message.name === 'turn') {
      setCurrentPlayer(message.data);
    }
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextPlayer = (currentPlayer + 1) % 2; 
    await channel.publish('turn', nextPlayer);
  };

  const isCurrentPlayer = currentPlayer

  return (
    <FadeTransition>
      <div className='flex flex-col h-screen'>
        <Header guessesCounter={guessesCounter} setOpen={setOpen} open={open}/>
        <div className='flex flex-col flex-grow justify-center items-center overflow-hidden'>
          <AnimatedText text={`Player ${currentPlayer + 1}'s Turn`} />
          <PreviousGuessList guesses={guesses} />
        </div>
        <CodeInput
          guess={guess}
          setGuess={setGuess}
          handleSubmit={handleSubmit}
          disabled={!isCurrentPlayer} 
        />
      </div>
    </FadeTransition>
  );
}
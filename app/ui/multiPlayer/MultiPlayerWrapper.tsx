import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { AblyProvider, useChannel } from 'ably/react';
import FadeTransition from '../ui/../animations/FadeTransition';
import AnimatedTextTurn from '../ui/../animations/AnimatedTextTurn';
import PreviousGuessList from '../../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../../ui/singlePlayer/CodeInput';
import Header from '../../ui/singlePlayer/Header';
import { Status } from '@/lib/definitions';
import { AnimatePresence } from 'framer-motion';
import MultiplayerRulesModal from './MultiPlayerRulesModal';

const client = new Ably.Realtime.Promise({
  authUrl: '/api/Ably',
  authMethod: 'POST',
});

interface Guess {
  value: string;
  status: Status;
}

interface MultiplayerWrapperProperties {
  playerNames: string[];
  currentPlayerName: string;
}

export default function MultiPlayerWrapper({
  playerNames,
  currentPlayerName,
}: MultiplayerWrapperProperties) {
  return (
    <AblyProvider client={client}>
      <MultiPlayer
        playerNames={playerNames}
        currentPlayerName={currentPlayerName}
      />
    </AblyProvider>
  );
}

function MultiPlayer({
  playerNames,
  currentPlayerName,
}: MultiplayerWrapperProperties) {
  const [currentPlayer, setCurrentPlayer] = useState<string>(playerNames[0]);
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
    const currentIndex = playerNames.indexOf(currentPlayer);
    const nextIndex = (currentIndex + 1) % playerNames.length;
    const nextPlayer = playerNames[nextIndex];
    await channel.publish('turn', nextPlayer);
  };

  const isPlayerTurn = currentPlayer === currentPlayerName;
  return (
    <FadeTransition>
      <AnimatePresence>
        {open && <MultiplayerRulesModal open={open} setOpen={setOpen} />}
      </AnimatePresence>
      <div className='flex flex-col h-screen'>
        <Header guessesCounter={guessesCounter} setOpen={setOpen} open={open} />
        <div className='flex flex-col flex-grow justify-center items-center overflow-hidden'>
          <AnimatedTextTurn text={`${currentPlayer}'s Turn`} />
          <PreviousGuessList guesses={guesses} />
        </div>
        <CodeInput
          guess={guess}
          setGuess={setGuess}
          handleSubmit={handleSubmit}
          disabled={!isPlayerTurn}
        />
      </div>
    </FadeTransition>
  );
}

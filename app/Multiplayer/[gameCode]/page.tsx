'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { GameButton } from '../../ui/buttons';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Players = dynamic(() => import('../../ui/multiPlayer/Players'), {
  ssr: false,
});

const Game = dynamic(() => import('../../ui/multiPlayer/Game'), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
};

const GameRoom = () => {
  const { gameCode } = useParams() as { gameCode: string };
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [currentPlayerName, setCurrentPlayerName] = useState('');

  return (
    <motion.div
      className={
        !gameStarted
          ? 'flex flex-col p-4 justify-center content-center h-screen'
          : 'flex flex-col justify-center content-center h-screen'
      }
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {!gameStarted && (
        <h1 className='flex justify-center text-xl font-bold text-white'>
          Game Room: {gameCode}
        </h1>
      )}
      {!gameStarted && (
        <Players
          setPlayerCount={setPlayerCount}
          gameCode={gameCode}
          setPlayerNames={setPlayerNames}
          currentPlayerName={currentPlayerName}
          setCurrentPlayerName={setCurrentPlayerName}
        />
      )}
      <Game
        playerCount={playerCount}
        onGameStart={() => setGameStarted(true)}
        playerNames={playerNames}
        currentPlayerName={currentPlayerName}
      />
    </motion.div>
  );
};

export default GameRoom;

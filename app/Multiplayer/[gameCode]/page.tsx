'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GameButton } from '../../ui/buttons';
import { motion } from 'framer-motion';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Players = dynamic(() => import('../../ui/multiPlayer/Players'), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
};

const GameRoom = () => {
  const { gameCode } = useParams() as { gameCode: string };
  const [players, setPlayers] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  function handleStartGame(): void {
    setGameStarted(true)
  }

  return (
    <motion.div
      className='flex flex-col p-4 justify-center content-center'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <h1 className='flex justify-center text-xl font-bold text-white'>
        Game Room: {gameCode}
      </h1>
      {!gameStarted && (
        <>
          <Players
            players={players}
            setPlayers={setPlayers}
            gameCode={gameCode}
          />
          <GameButton onClick={handleStartGame} disabled={players !== 2}>
            Start Game
          </GameButton>
        </>
      )}
    </motion.div>
  );
};

export default GameRoom;

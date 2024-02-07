'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import { GameButton } from '../../ui/buttons';
import { Socket } from 'socket.io-client';
import { motion } from 'framer-motion';

interface Player {
  name: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
};

const playerVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4 } },
};

const GameRoom = () => {
  const { gameCode } = useParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [isNameChosen, setIsNameChosen] = useState(false);

  useEffect(() => {
    if (typeof gameCode === 'string') {
      const newSocket = io('/', { path: '/api/socket' });
      setSocket(newSocket);

      newSocket.emit('joinRoom', gameCode);

      newSocket.on('playerJoined', (newPlayer: Player) => {
        setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      });

      newSocket.on('gameStarted', () => {
        // Handle game starting
      });

      return () => {
        newSocket.close();
      };
    }
  }, [gameCode]);

  const handleJoinGame = () => {
    if (playerName.trim() && socket && typeof gameCode === 'string') {
      setIsNameChosen(true);
      socket.emit('joinGame', { gameCode, playerName });
    }
  };

  function handleStartGame(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <motion.div
      className='flex flex-col p-4 justify-center content-center'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <h1 className='flex justify-center text-xl font-bold text-white'>Game Room: {gameCode}</h1>
      {!isNameChosen ? (
        <div className=' my-4'>
          <input
            type='text'
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder='Choose your name'
            className='border-2 rounded p-1 shadow text-blue font-bold w-full'
          />
          <GameButton onClick={handleJoinGame}>Join Game</GameButton>
        </div>
      ) : (
        <p>Welcome, {playerName}</p>
      )}
      <div className='bg-white p-4 my-4 border rounded shadow'>
        <h2>Players:</h2>
        <motion.ul>
          {players.map((player, index) => (
            <motion.li
              key={index}
              variants={playerVariants}
              className='list-none'
            >
              {player.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <GameButton onClick={handleStartGame} disabled={players.length !== 2}>
        Start Game
      </GameButton>
    </motion.div>
  );
};

export default GameRoom;

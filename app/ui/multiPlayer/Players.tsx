import { useEffect, useState } from 'react';
import * as Ably from 'ably';
import { motion } from 'framer-motion';
import { AblyProvider, useAbly, usePresence } from 'ably/react';
import { Dispatch, SetStateAction } from 'react';
import { GameButton } from '../buttons';

interface PlayerProperties {
  setPlayers: Dispatch<SetStateAction<number>>;
  gameCode: string;
}

interface PlayersPresenceProps {
  setPlayers: Dispatch<SetStateAction<number>>;
  gameCode: string;
}

export default function Players({ setPlayers, gameCode }: PlayerProperties) {
  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  const client = new Ably.Realtime.Promise({
    authUrl: '/api/Ably',
    authMethod: 'POST',
    clientId: playerName,
  });

  const handleJoinGame = async () => {
    setHasJoined(true);
  };

  return (
    <AblyProvider client={client}>
      <div className=' my-4'>
        {!hasJoined && (
          <input
            type='text'
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder='Choose your name'
            className='border-2 rounded p-1 shadow text-blue font-bold w-full'
          />
        )}
        {!hasJoined && (
          <GameButton onClick={handleJoinGame}>Join Game</GameButton>
        )}
        {hasJoined && (
          <PlayersPresence setPlayers={setPlayers} gameCode={gameCode} />
        )}
      </div>
    </AblyProvider>
  );
}

const PlayersPresence = ({ setPlayers, gameCode }: PlayersPresenceProps) => {
  const { presenceData } = usePresence(gameCode);

  const playerVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  useEffect(() => {
    setPlayers(presenceData.length);
  }, [presenceData.length, setPlayers]);

  return (
    <div className='bg-white p-4 my-4 border rounded shadow'>
      <h2 className='text-blue font-bold'>Players:</h2>
      <motion.ul>
        {presenceData.map((member) => (
          <motion.li
            key={member.clientId}
            variants={playerVariants}
            className='list-none text-white font-bold bg-blue rounded p-2 my-2'
          >
            {member.clientId}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

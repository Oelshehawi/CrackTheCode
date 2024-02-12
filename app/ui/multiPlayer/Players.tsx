import { useEffect, useState } from 'react';
import * as Ably from 'ably';
import { motion } from 'framer-motion';
import { AblyProvider, usePresence } from 'ably/react';
import { Dispatch, SetStateAction } from 'react';
import { GameButton } from '../buttons';

interface PlayerProperties {
  setPlayerCount: Dispatch<SetStateAction<number>>;
  gameCode: string;
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  currentPlayerName: string;
  setCurrentPlayerName: Dispatch<SetStateAction<string>>;
}

interface PlayersPresenceProps {
  setPlayerCount: Dispatch<SetStateAction<number>>;
  gameCode: string;
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
}

export default function Players({
  setPlayerCount,
  gameCode,
  setPlayerNames,
  currentPlayerName,
  setCurrentPlayerName,
}: PlayerProperties) {
  const [hasJoined, setHasJoined] = useState(false);

  const client = new Ably.Realtime.Promise({
    authUrl: '/api/Ably',
    authMethod: 'POST',
    clientId: currentPlayerName,
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
            value={currentPlayerName}
            onChange={(e) => setCurrentPlayerName(e.target.value)}
            placeholder='Choose your name'
            className='border-2 rounded p-1 shadow text-blue font-bold w-full'
          />
        )}
        {!hasJoined && (
          <GameButton onClick={handleJoinGame}>Join Game</GameButton>
        )}
        {hasJoined && (
          <PlayersPresence
            setPlayerCount={setPlayerCount}
            gameCode={gameCode}
            setPlayerNames={setPlayerNames}
          />
        )}
      </div>
    </AblyProvider>
  );
}

const PlayersPresence = ({
  setPlayerCount,
  gameCode,
  setPlayerNames,
}: PlayersPresenceProps) => {
  const { presenceData } = usePresence(gameCode);
  const [counter, setCounter] = useState(0);

  const playerVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  useEffect(() => {
    setPlayerCount(presenceData.length);
    const newPlayerNames = presenceData.map(presence => presence.clientId);
    setPlayerNames(newPlayerNames);
  }, [presenceData, setPlayerCount, setPlayerNames]);

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

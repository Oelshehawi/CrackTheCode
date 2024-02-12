import { useState } from 'react';
import * as Ably from 'ably';
import { AblyProvider, useChannel } from 'ably/react';
import { GameButton } from '../buttons';
import MultiPlayerWrapper from './MultiPlayerWrapper';

interface GameProperties {
  playerCount: number;
  onGameStart: () => void;
  playerNames: string[];
  currentPlayerName: string;
}

const client = new Ably.Realtime.Promise({
  authUrl: '/api/Ably',
  authMethod: 'POST',
});

export default function Game({ playerCount, onGameStart,playerNames, currentPlayerName }: GameProperties) {
  return (
    <AblyProvider client={client}>
      <GameEvents playerCount={playerCount} onGameStart={onGameStart} playerNames={playerNames} currentPlayerName={currentPlayerName} />
    </AblyProvider>
  );
}

const GameEvents = ({ playerCount, onGameStart, playerNames, currentPlayerName }: GameProperties) => {
  const [hideButton, setHideButton] = useState(true);
  const { channel } = useChannel('game-start', (message) => {
    if (message.data === 'gameStarted') {
      setHideButton(false);
      onGameStart();
    }
  });

  const handleStartGame = async () => {
    try {
      await channel.publish('game-start', 'gameStarted');
    } catch (err) {
      console.error('Failed to publish message', err);
    }
  };

  const MAX_PLAYER_COUNT = 2;

  return hideButton ? (
    <GameButton
      onClick={handleStartGame}
      disabled={playerCount !== MAX_PLAYER_COUNT}
    >
      Start Game
    </GameButton>
  ) : (
    <MultiPlayerWrapper playerNames={playerNames} currentPlayerName={currentPlayerName} />
  );
};

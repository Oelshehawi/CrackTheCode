import { Status } from './definitions';

interface Player {
  name: string;
}

interface GameRoom {
  gameCode: string;
  players: Player[];
  gameStarted: boolean;
}

const gameRooms = new Map<string, GameRoom>();

export function createCode(): string {
  let code: number[] = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 10));
  }
  return code.join('');
}

export function checkGuess(guess: string, code: string): Status {
  if (guess === code) {
    return 'match';
  }

  for (let char of guess) {
    if (code.includes(char)) {
      return 'exists';
    }
  }

  return 'none';
}

export function createGameRoom(): string {
  const gameCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  const gameRoom: GameRoom = { gameCode, players: [], gameStarted: false };
  gameRooms.set(gameCode, gameRoom);
  return gameCode;
}

export function getGameRoom(gameCode: string): GameRoom | undefined {
  return gameRooms.get(gameCode);
}

export function joinGameRoom(gameCode: string, playerName: string): boolean {
  const gameRoom = gameRooms.get(gameCode);
  if (gameRoom && gameRoom.players.length < 2) {
    gameRoom.players.push({ name: playerName });
    return true;
  }
  return false;
}



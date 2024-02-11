import { Status } from './definitions';

interface Player {
  name: string;
}

interface GameRoom {
  gameCode: string;
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
  return gameCode;
}




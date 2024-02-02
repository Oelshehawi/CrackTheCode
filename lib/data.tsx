export function createCode(): number[] {
    let code: number[] = [];
    for (let i = 0; i < 4; i++) {
      code.push(Math.floor(Math.random() * 10));
    }
  
    return code;
  }
  
  export function checkGuess(guess: number[]): boolean {

    return false;
  }


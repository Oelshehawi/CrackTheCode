export function createCode(): string {
    let code: number[] = [];
    for (let i = 0; i < 4; i++) {
      code.push(Math.floor(Math.random() * 10));
    }
  
    return code.join('');
  }
  
  export function checkGuess(guess: string, code: string): boolean {
    
    return false;
  }


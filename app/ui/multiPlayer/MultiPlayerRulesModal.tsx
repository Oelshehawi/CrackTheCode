import { Dispatch, SetStateAction } from 'react';
import AnimateModal from '../animations/AnimateModal';

interface MultiplayerModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function MultiplayerRulesModal({ open, setOpen }: MultiplayerModalProps) {
  if (!open) return null;

  return (
    <AnimateModal>
      <div className='bg-blue p-5 rounded-lg shadow-md m-5 z-40'>
        <h2 className='flex flex-row justify-between text-lg font-bold mb-4'>
          {'Multiplayer Crack the Code Rules'}
          <div className='cursor-pointer' onClick={() => setOpen(!open)}>
            {'X'}
          </div>
        </h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>
            Players take turns to guess the secret 4-digit code, with each digit ranging from 0 to 9. Digits can repeat.
          </li>
          <li>
            {'After each guess, you\'ll receive feedback to help refine your next guess. The feedback colors indicate:'}
            <ul className='list-disc list-inside ml-4 space-y-2'>
              <li>
                <span className='text-statusNeutral font-bold'>Gray</span> - None of the numbers in your guess are in the secret code.
              </li>
              <li>
                <span className='text-statusExists font-bold'>Yellow</span> - At least one number is correct but in the wrong position.
              </li>
              <li>
                <span className='text-statusMatches font-bold'>Green</span> - A number is exactly right, in the correct position.
              </li>
            </ul>
          </li>
          <li>
            Use the feedback from each guess wisely, as each player will only see their own feedback.
          </li>
          <li>
           {' After a predetermined number of rounds, each player gets a random opportunity to see the other player\'s last guess. Use this chance to gain insight into your opponent\'s strategy.'}
          </li>
          <li>
            The game ends when a player guesses the code correctly or when all rounds are completed. The player who cracks the code with the fewest guesses wins.
          </li>
        </ul>
      </div>
    </AnimateModal>
  );
}
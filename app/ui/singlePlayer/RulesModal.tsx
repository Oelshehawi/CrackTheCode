import AnimateModal from '../animations/AnimateModal';
interface ModalProps {
  open: boolean;
}

export default function RulesModal({ open }: ModalProps) {
  if (!open) return null;

  return (
    <AnimateModal>
      <div className='bg-blue p-5 rounded-lg shadow-md m-5'>
        <h2 className='text-lg font-bold mb-4'>
          {'How to Play Crack the Code?'}
        </h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>
            Your goal is to guess the secret 4-digit code as quickly as
            possible.
          </li>
          <li>
            Each digit in the code ranges from 0 to 9 and digits can repeat.
          </li>
          <li>After each guess, you will receive feedback on your guess:</li>
          <ul className='list-disc list-inside ml-4 space-y-2'>
            <li>
              <span className='text-statusNeutral font-bold'>Gray</span> -{' '}
              {'None of the numbers in your guess exist in the secret code.'}
            </li>
            <li>
              <span className='text-statusExists font-bold'>Yellow</span> -{' '}
              {
                "At least one of the numbers in your guess exists in the secret code, but it's in the wrong position or not the exact match."
              }
            </li>
            <li>
              <span className='text-statusMatches font-bold'>Green</span> -{' '}
              {"The guess is exactly right, and you've cracked the code!"}
            </li>
          </ul>
          <li>
            Use the feedback from each guess to make better guesses and crack
            the code.
          </li>
          <li>
            The game continues until you guess the code correctly or until you
            run out of guesses.
          </li>
        </ul>
      </div>
    </AnimateModal>
  );
}

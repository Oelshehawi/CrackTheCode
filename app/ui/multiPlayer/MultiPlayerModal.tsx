import { GameButton, JoinGameButton } from '../buttons';
import AnimateModal from '../animations/AnimateModal';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MultiPlayerModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  if (!open) return null;

  // Function to stop event propagation
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimateModal>
      <div className='fixed inset-0 flex justify-center items-center' onClick={() => setOpen(false)}>
        <div className='bg-white p-5 rounded-lg shadow-md m-5 relative' onClick={stopPropagation}>
          <GameButton href='/GameRoom' className='mb-4 w-full'>
            Create Game
          </GameButton>
          <JoinGameButton className='mt-4 w-full'>Join Game</JoinGameButton>
          <button
            onClick={() => setOpen(false)}
            className='text-blue absolute top-0 right-0 m-2 font-bold'
          >
            X
          </button>
        </div>
      </div>
    </AnimateModal>
  );
};

export default MultiPlayerModal;
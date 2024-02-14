import { GameButton, JoinGameButton } from '../buttons';
import AnimateModal from '../animations/AnimateModal';
import { createGameRoom } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MultiPlayerModal: React.FC<ModalProps> = ({ open, setOpen }) => {
  const router = useRouter();
  if (!open) return null;

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCreateGame = async () => {
    const gameCode = await createGameRoom();

    router.push(`/MultiPlayer/${gameCode}`);
  };

  return (
    <AnimateModal>
      <div
        className='fixed inset-0 flex justify-center items-center'
        onClick={() => setOpen(false)}
      >
        <div
          className='bg-white p-5 rounded-lg shadow-md m-5 relative'
          onClick={stopPropagation}
        >
          <GameButton onClick={handleCreateGame} className='mb-4 w-full'>
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

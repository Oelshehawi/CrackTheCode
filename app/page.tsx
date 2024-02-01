import { Button,TitleButton } from './ui/buttons';
import { TitleHeader } from './ui/titleScreen/titleHeader';

export default function Home() {
  return (
    <div className='flex flex-col justify-evenly content-center flex-wrap min-h-screen'>
      <TitleHeader />
      <div className='flex flex-col gap-y-4 justify-between content-center'>
        <TitleButton> Play Single Player</TitleButton>
        <TitleButton> Play Multi Player</TitleButton>
      </div>
    </div>
  );
}

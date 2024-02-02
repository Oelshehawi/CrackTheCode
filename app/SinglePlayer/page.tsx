'use client';
import FadeTransition from '../ui/FadeTransition';
import AnimatedText from '../ui/AnimatedText';
import PreviousGuessList from '../ui/singlePlayer/PreviousGuessList';
import CodeInput from '../ui/singlePlayer/CodeInput';

export default function SinglePlayer() {
  return (
    <FadeTransition>
      <div className=' flex flex-col justify-center items-center h-screen'>
        <AnimatedText text='Welcome to Single Player Mode!' />
        <div className='z-0'>
          <PreviousGuessList />
          <CodeInput />
        </div>
      </div>
    </FadeTransition>
  );
}

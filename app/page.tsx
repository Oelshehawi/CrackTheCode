'use client'
import { TitleButton } from './ui/buttons';
import { TitleHeader } from './ui/titleScreen/titleHeader';
import Link from 'next/link';
import FadeTransition from './ui/FadeTransition';

export default function Home() {
  return (
    <FadeTransition>
      <div className='flex flex-col justify-evenly content-center flex-wrap min-h-screen'>
        <TitleHeader />
        <div className='flex flex-col gap-y-4 justify-between content-center'>
          <TitleButton href='SinglePlayer'> Play Single Player</TitleButton>
          <TitleButton href='MultiPlayer'> Play Multi Player</TitleButton>
        </div>
      </div>
    </FadeTransition>
  );
}

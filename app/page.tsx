'use client';
import { useState } from 'react';
import { MultiPlayerButton, SinglePlayerButton } from './ui/buttons';
import MultiPlayerModal from './ui/multiPlayer/MultiPlayerModal';
import { TitleHeader } from './ui/titleScreen/titleHeader';
import FadeTransition from './ui/animations/FadeTransition';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <FadeTransition>
      <div className='flex flex-col justify-evenly content-center flex-wrap min-h-screen'>
        <TitleHeader />
        <div className='flex flex-col gap-y-4 justify-between content-center'>
          <SinglePlayerButton href='Singleplayer'>
            Play Single Player
          </SinglePlayerButton>
          <MultiPlayerButton open={open} setOpen={setOpen}>
            Play Multi Player
          </MultiPlayerButton>
        </div>
        <AnimatePresence>
          {open && <MultiPlayerModal open={open} setOpen={setOpen} />}
        </AnimatePresence>
      </div>
    </FadeTransition>
  );
}

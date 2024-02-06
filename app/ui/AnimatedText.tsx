import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Initial animation to bring text into view
      await controls.start('onscreen');
      // Wait for a moment before starting the exit animation
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Start the exit animation
      await controls.start('exit');
    };

    sequence();
  }, [controls]);

  const textVariants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 1,
      },
    },
    exit: {
      y: -100, // Adjust this value to control how far up the text moves
      opacity: 0,
      transition: {
        duration: 0.5, // Control the speed of the exit animation
      },
    },
  };

  return (
    <div className='absolute z-10 flex justify-center items-center w-full h-full pointer-events-none'>
      <motion.div
        initial='offscreen'
        animate={controls}
        variants={textVariants}
        className='md:text-4xl text-xl font-bold mx-5 bg-blue rounded-lg shadow-lg p-4 text-white'
      >
        {text}
      </motion.div>
    </div>
  );
};

export default AnimatedText;

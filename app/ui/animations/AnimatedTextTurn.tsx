import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible');
      await new Promise((resolve) => setTimeout(resolve, 250)); 
      await controls.start('scaledDown');
    };

    sequence();
  }, [text, controls]); 

  const textVariants = {
    visible: {
      scale: 1.5,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration: 0.5,
      },
    },
    scaledDown: {
      scale: 1,
      y: 25, 
      transition: {
        type: 'spring',
        duration: 0.5,
      },
    },
  };

  return (
    <div className='flex justify-center items-center w-full'> 
      <motion.div
        initial='visible'
        animate={controls}
        variants={textVariants}
        className='text-xl font-bold mx-5 bg-blue rounded-lg shadow-lg p-4 text-white'
      >
        {text}
      </motion.div>
    </div>
  );
};

export default AnimatedText;
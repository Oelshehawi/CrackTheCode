// AnimatedInput.tsx
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styles from '../titleButton.module.css'; // Ensure correct path

interface AnimatedInputProps {
  placeholder: string;
  onSubmit: (gameCode: string) => void;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ placeholder, onSubmit }) => {
  const [gameCode, setGameCode] = useState('');

  const handleJoinGameSubmit = () => {
    onSubmit(gameCode); 
    setGameCode(''); 
  };

  return (
    <motion.div 
      initial={{ width: 0, opacity: 0 }} 
      animate={{ width: "100%", opacity: 1 }} 
      exit={{ width: 0, opacity: 0 }} 
      transition={{ duration: 0.5 }} 
      className="mt-4"
    >
      <input 
        type="text" 
        value={gameCode} 
        onChange={(e) => setGameCode(e.target.value)} 
        className="p-2 w-full rounded border-2 border-blue text-blue font-bold"
        placeholder={placeholder} 
      />
      <button 
        onClick={handleJoinGameSubmit} 
        className={`${styles.pushable} rounded-b w-full mt-4`} 
      >
        <span className={styles.shadow}></span>
        <span className={styles.edge}></span>
        <span className={styles.front}>Go</span>
      </button>
    </motion.div>
  );
};

export default AnimatedInput;

import { motion } from 'framer-motion';

interface GuessList {
  guesses: string[];
}

export default function PreviousGuessList({ guesses }: GuessList) {
  const guessVariants = {
    hidden: (isLatest: boolean) => ({
      opacity: isLatest ? 0 : 1, 
      y: isLatest ? -20 : 0      
    }),
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-white rounded shadow-lg w-3/4 h-3/4 overflow-auto"
    >
      {[...guesses].reverse().map((guess, index) => (
        <motion.div
          layout 
          custom={index === 0} 
          initial="hidden"
          animate="visible"
          variants={guessVariants}
          transition={{ duration: 0.5, delay: 0 }}
          key={guess + index} 
          className="p-2 m-2 text-white font-bold text-center rounded bg-blue"
        >
          {guess}
        </motion.div>
      ))}
    </motion.div>
  );
}

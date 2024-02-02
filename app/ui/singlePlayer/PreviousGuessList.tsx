import { motion } from 'framer-motion';

export default function PreviousGuessList() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={listVariants}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded shadow-lg w-3/4 h-3/4"
    >
      Previous Guesses
      {/* You can map over your guesses here */}
    </motion.div>
  );
}

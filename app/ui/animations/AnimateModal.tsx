
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateModalProps {
    children: ReactNode
}

const AnimateModal = ({ children } : AnimateModalProps) => {
  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden" 
      variants={variants}
      transition={{ duration: 0.3 }} 
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      {children}
    </motion.div>
  );
};

export default AnimateModal;

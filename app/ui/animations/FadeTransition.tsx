import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface FadeTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95, // Start from a smaller scale
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.05, // Scale up slightly as it fades out
  },
};

const fadeTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.75, // Increase duration for a more noticeable effect
};

const FadeTransition: React.FC<FadeTransitionProps> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={fadeTransition}
  >
    {children}
  </motion.div>
);

export default FadeTransition;
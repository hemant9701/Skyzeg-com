'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedReveal({ children, className }: AnimatedRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

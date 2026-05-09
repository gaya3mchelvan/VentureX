import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import React, { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true, ...props }) => {
  return (
    <motion.div
      {...props as any}
      whileHover={hover ? { y: -4, borderColor: 'rgba(255,255,255,0.2)' } : undefined}
      className={cn(
        'glass rounded-2xl p-6 transition-colors duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

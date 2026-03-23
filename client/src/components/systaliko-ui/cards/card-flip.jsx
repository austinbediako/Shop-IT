import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/utils';

export function CardFlip({ children, className, ...props }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("group perspective-1000 cursor-pointer", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      {...props}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CardFlipFront({ children, className, ...props }) {
  return (
    <div className={cn("absolute inset-0 backface-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFlipBack({ children, className, ...props }) {
  return (
    <div className={cn("absolute inset-0 backface-hidden rotate-y-180", className)} {...props}>
      {children}
    </div>
  );
}

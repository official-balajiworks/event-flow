import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { pageTransitions, durations, easings } from '@/animations/config';

interface PageTransitionProps {
  children: ReactNode;
  variant?: 'fadeSlide' | 'scaleBlur' | 'slideUp';
  className?: string;
}

export const PageTransition = ({ 
  children, 
  variant = 'fadeSlide',
  className = '' 
}: PageTransitionProps) => {
  const transition = pageTransitions[variant];
  
  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
      transition={transition.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedPresenceWrapperProps {
  children: ReactNode;
  locationKey: string;
}

export const AnimatedPresenceWrapper = ({ 
  children, 
  locationKey 
}: AnimatedPresenceWrapperProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={locationKey}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

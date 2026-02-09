import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { fadeInUp, springGentle } from '@/animations/config';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  hover?: boolean;
  delay?: number;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = true, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ 
          ...springGentle, 
          delay 
        }}
        whileHover={hover ? { 
          scale: 1.02,
          boxShadow: '0 12px 40px hsl(0 0% 0% / 0.4)',
        } : undefined}
        className={cn(
          'glass-card rounded-xl p-6',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  variant?: 'card' | 'text' | 'image';
}

export const SkeletonLoader = ({ className, lines = 3, variant = 'text' }: SkeletonLoaderProps) => {
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn('glass-card rounded-xl overflow-hidden', className)}
      >
        <div className="h-48 bg-muted/30 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-5 w-3/4 bg-muted/30 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-muted/20 rounded animate-pulse" />
          <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
        </div>
      </motion.div>
    );
  }

  if (variant === 'image') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn('bg-muted/30 rounded-xl animate-pulse', className)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('space-y-3', className)}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted/30 rounded animate-pulse"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </motion.div>
  );
};

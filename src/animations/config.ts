import { Transition, Variants } from 'framer-motion';

// Spring configurations
export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

export const springOvershoot: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

// Duration limits (max 500ms as per requirements)
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.4,
  max: 0.5,
};

// Easing curves
export const easings = {
  overshoot: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
};

// Reusable animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: durations.normal }
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: durations.normal, ease: easings.smooth }
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springOvershoot
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: durations.normal, ease: easings.smooth }
  },
  exit: { 
    opacity: 0, 
    x: -30,
    transition: { duration: durations.fast }
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: durations.normal, ease: easings.smooth }
  },
  exit: { 
    opacity: 0, 
    x: 30,
    transition: { duration: durations.fast }
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springBouncy
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { duration: durations.fast }
  },
};

// Page transition variants
export const pageTransitions = {
  fadeSlide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: durations.normal, ease: easings.smooth },
  },
  scaleBlur: {
    initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
    transition: { duration: durations.slow, ease: easings.smooth },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

// Stagger configuration for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Radial menu item animation
export const radialItem = (index: number, total: number): Variants => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 80;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      x: 0, 
      y: 0,
      rotate: -10,
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x, 
      y,
      rotate: 0,
      transition: {
        ...springOvershoot,
        delay: index * 0.08,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      x: 0,
      y: 0,
      transition: { duration: durations.fast },
    },
  };
};

// Button press animation
export const buttonPress = {
  scale: 0.95,
  transition: { duration: durations.fast },
};

// Glow effect on hover
export const glowHover = {
  boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
  transition: { duration: durations.normal },
};

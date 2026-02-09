import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { springOvershoot, fadeIn } from '@/animations/config';

const Splash = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate('/home'), 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient orbs */}
      <div className="floating-orb w-96 h-96 bg-primary/30 -top-48 -left-48" />
      <div className="floating-orb w-80 h-80 bg-secondary/30 top-1/4 -right-40" style={{ animationDelay: '-5s' }} />
      <div className="floating-orb w-64 h-64 bg-accent/30 -bottom-32 left-1/3" style={{ animationDelay: '-10s' }} />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with overshoot animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springOvershoot}
          className="relative"
        >
          {/* Glow effect behind logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 blur-3xl bg-primary/40 rounded-full scale-150"
          />
          
          {/* Logo icon */}
          <motion.div
            className="relative glass-card rounded-2xl p-6"
            animate={{ 
              boxShadow: [
                '0 0 20px hsl(var(--primary) / 0.4)',
                '0 0 40px hsl(var(--primary) / 0.6)',
                '0 0 20px hsl(var(--primary) / 0.4)',
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: 'easeInOut'
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="relative z-10"
            >
              {/* Calendar-like icon with gradient */}
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(270, 70%, 60%)" />
                  <stop offset="50%" stopColor="hsl(220, 70%, 50%)" />
                  <stop offset="100%" stopColor="hsl(180, 60%, 45%)" />
                </linearGradient>
              </defs>
              <rect x="10" y="18" width="60" height="52" rx="8" stroke="url(#logoGradient)" strokeWidth="3" fill="none" />
              <path d="M10 34 H70" stroke="url(#logoGradient)" strokeWidth="3" />
              <circle cx="28" cy="12" r="4" fill="url(#logoGradient)" />
              <circle cx="52" cy="12" r="4" fill="url(#logoGradient)" />
              <path d="M24 46 L34 56 L56 34" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* App name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 text-4xl font-bold gradient-text"
        >
          EventFlow
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-2 text-muted-foreground"
        >
          Premium Event Management
        </motion.p>
        
        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="mt-8 h-1 w-32 rounded-full gradient-bg origin-left"
        />
      </div>
    </motion.div>
  );
};

export default Splash;

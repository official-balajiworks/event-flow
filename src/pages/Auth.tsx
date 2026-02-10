import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animated/PageTransition';
import { GlassCard } from '@/components/animated/GlassCard';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { useAuth } from '@/hooks/useAuth';
import { springGentle } from '@/animations/config';

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <PageTransition variant="fadeSlide" className="min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-background">
        <div className="floating-orb w-[400px] h-[400px] bg-primary/20 -top-48 -right-48" />
        <div className="floating-orb w-[350px] h-[350px] bg-secondary/20 bottom-0 -left-32" style={{ animationDelay: '-8s' }} />
        <div className="floating-orb w-[250px] h-[250px] bg-accent/20 top-1/2 right-1/4" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <GlassCard className="w-full max-w-md p-8" hover={false}>
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springGentle}
            className="flex justify-center mb-8"
          >
            <div className="glass-card rounded-2xl p-4">
              <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
                <defs>
                  <linearGradient id="authLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(270, 70%, 60%)" />
                    <stop offset="50%" stopColor="hsl(220, 70%, 50%)" />
                    <stop offset="100%" stopColor="hsl(180, 60%, 45%)" />
                  </linearGradient>
                </defs>
                <rect x="10" y="18" width="60" height="52" rx="8" stroke="url(#authLogoGradient)" strokeWidth="3" fill="none" />
                <path d="M10 34 H70" stroke="url(#authLogoGradient)" strokeWidth="3" />
                <circle cx="28" cy="12" r="4" fill="url(#authLogoGradient)" />
                <circle cx="52" cy="12" r="4" fill="url(#authLogoGradient)" />
                <path d="M24 46 L34 56 L56 34" stroke="url(#authLogoGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome to <span className="gradient-text">EventFlow</span>
            </h1>
            <p className="text-muted-foreground">
              Sign in to create, discover, and manage events
            </p>
          </motion.div>

          {/* Google Sign In Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <AnimatedButton
              variant="glow"
              size="lg"
              onClick={handleGoogleSignIn}
              className="w-full gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </AnimatedButton>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default Auth;

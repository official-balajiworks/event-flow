import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, Users, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { GlassCard } from '@/components/animated/GlassCard';
import { PageTransition } from '@/components/animated/PageTransition';
import { staggerContainer, fadeInUp, springGentle } from '@/animations/config';
import { supabase } from '@/lib/supabase';

const features = [
  {
    icon: Calendar,
    title: 'Seamless Event Creation',
    description: 'Create and manage events with an intuitive interface designed for organizers.',
  },
  {
    icon: Users,
    title: 'Easy Registration',
    description: 'Connect participants to your events through streamlined registration flows.',
  },
  {
    icon: Sparkles,
    title: 'Beautiful Experience',
    description: 'Premium design with fluid animations that make every interaction delightful.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Built with enterprise-grade security to protect your event data.',
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <PageTransition variant="scaleBlur" className="min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-background">
        <div className="floating-orb w-[500px] h-[500px] bg-primary/20 -top-64 -left-64" />
        <div className="floating-orb w-[400px] h-[400px] bg-secondary/20 top-1/3 -right-48" style={{ animationDelay: '-7s' }} />
        <div className="floating-orb w-[300px] h-[300px] bg-accent/20 -bottom-32 left-1/4" style={{ animationDelay: '-14s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={springGentle}
              className="mb-8 inline-block"
            >
              <div className="glass-card rounded-2xl p-4 inline-block">
                <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
                  <defs>
                    <linearGradient id="heroLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(270, 70%, 60%)" />
                      <stop offset="50%" stopColor="hsl(220, 70%, 50%)" />
                      <stop offset="100%" stopColor="hsl(180, 60%, 45%)" />
                    </linearGradient>
                  </defs>
                  <rect x="10" y="18" width="60" height="52" rx="8" stroke="url(#heroLogoGradient)" strokeWidth="3" fill="none" />
                  <path d="M10 34 H70" stroke="url(#heroLogoGradient)" strokeWidth="3" />
                  <circle cx="28" cy="12" r="4" fill="url(#heroLogoGradient)" />
                  <circle cx="52" cy="12" r="4" fill="url(#heroLogoGradient)" />
                  <path d="M24 46 L34 56 L56 34" stroke="url(#heroLogoGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">EventFlow</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Create, discover, and manage events with a premium experience 
              designed for both organizers and participants.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, ...springGentle }}
            >
              <AnimatedButton
                variant="glow"
                size="lg"
                onClick={handleGetStarted}
                className="group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
            </motion.div>
          </motion.div>
        </section>

        {/* About / Features Section */}
        <section className="min-h-screen py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Why Choose <span className="gradient-text">EventFlow</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to create memorable events, all in one beautiful platform.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid md:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <GlassCard
                  key={feature.title}
                  delay={index * 0.1}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-bg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </GlassCard>
              ))}
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-16 text-center"
            >
              <AnimatedButton
                variant="glow"
                size="lg"
                onClick={handleGetStarted}
                className="group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border/50">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
            <p>© 2024 EventFlow. Crafted with precision and care.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Landing;

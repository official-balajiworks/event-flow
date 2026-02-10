import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animated/PageTransition';
import { GlassCard } from '@/components/animated/GlassCard';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <PageTransition variant="scaleBlur" className="min-h-screen bg-background">
      <div className="fixed inset-0">
        <div className="floating-orb w-[400px] h-[400px] bg-primary/10 -top-48 -left-48" />
        <div className="floating-orb w-[300px] h-[300px] bg-accent/10 bottom-0 -right-32" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold"
          >
            Welcome, <span className="gradient-text">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
          </motion.h1>
          <AnimatedButton variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </AnimatedButton>
        </div>

        {/* Placeholder content */}
        <GlassCard>
          <p className="text-muted-foreground text-center py-12">
            Dashboard coming in Phase 3 — Role system & event management
          </p>
        </GlassCard>
      </div>
    </PageTransition>
  );
};

export default Dashboard;

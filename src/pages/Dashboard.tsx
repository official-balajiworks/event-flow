import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animated/PageTransition';
import { RadialMenu } from '@/components/animated/RadialMenu';
import { OrganiserDashboard } from '@/components/dashboard/OrganiserDashboard';
import { ParticipantDashboard } from '@/components/dashboard/ParticipantDashboard';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { activeRole, switchRole, loading: roleLoading } = useRole(user?.id);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/home');
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  if (loading || roleLoading) {
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
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-orb w-[400px] h-[400px] bg-primary/10 -top-48 -left-48" />
        <div className="floating-orb w-[300px] h-[300px] bg-accent/10 bottom-0 -right-32" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Radial menu */}
      <RadialMenu activeRole={activeRole} onSwitch={switchRole} />

      {/* Sign out */}
      <div className="fixed top-6 right-20 z-50">
        <AnimatedButton variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </AnimatedButton>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6 max-w-6xl mx-auto pt-20">
        {activeRole === 'organiser' ? (
          <OrganiserDashboard userName={userName} />
        ) : (
          <ParticipantDashboard userName={userName} />
        )}
      </div>
    </PageTransition>
  );
};

export default Dashboard;

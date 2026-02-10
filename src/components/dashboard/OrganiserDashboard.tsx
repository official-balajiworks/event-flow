import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/animations/config';
import { GlassCard } from '@/components/animated/GlassCard';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { Calendar, Eye, FileText, Plus } from 'lucide-react';

interface OrganiserDashboardProps {
  userName: string;
}

const stats = [
  { label: 'Total Events', value: '0', icon: Calendar },
  { label: 'Published', value: '0', icon: Eye },
  { label: 'Drafts', value: '0', icon: FileText },
];

export const OrganiserDashboard = ({ userName }: OrganiserDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-sm text-muted-foreground">Organiser Dashboard</p>
          <h1 className="text-2xl font-bold">
            Welcome, <span className="gradient-text">{userName}</span>
          </h1>
        </motion.div>

        <AnimatedButton variant="glow" size="md" onClick={() => {}}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </AnimatedButton>
      </div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeInUp}>
            <GlassCard className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* My Events placeholder */}
      <div>
        <h2 className="text-lg font-semibold mb-4">My Events</h2>
        <GlassCard>
          <p className="text-muted-foreground text-center py-12">
            No events yet. Create your first event to get started!
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

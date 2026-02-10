import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/animations/config';
import { GlassCard } from '@/components/animated/GlassCard';
import { Search, Bookmark } from 'lucide-react';

interface ParticipantDashboardProps {
  userName: string;
}

const categories = ['All', 'Tech', 'Music', 'Sports', 'Arts', 'Business'];

export const ParticipantDashboard = ({ userName }: ParticipantDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <p className="text-sm text-muted-foreground">Participant Dashboard</p>
        <h1 className="text-2xl font-bold">
          Welcome, <span className="gradient-text">{userName}</span>
        </h1>
      </motion.div>

      {/* Search bar */}
      <GlassCard className="flex items-center gap-3 !p-3" hover={false}>
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events..."
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
        />
      </GlassCard>

      {/* Category filters */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex gap-2 flex-wrap"
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            variants={fadeInUp}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              i === 0
                ? 'gradient-bg text-primary-foreground'
                : 'glass-card text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Browse Events */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Browse Events</h2>
        <GlassCard>
          <p className="text-muted-foreground text-center py-12">
            No published events yet. Check back later!
          </p>
        </GlassCard>
      </div>

      {/* Saved Events */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-semibold">Saved Events</h2>
        </div>
        <GlassCard>
          <p className="text-muted-foreground text-center py-8">
            Bookmark events to see them here.
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

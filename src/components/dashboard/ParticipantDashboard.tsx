import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/animations/config';
import { GlassCard } from '@/components/animated/GlassCard';
import { SkeletonLoader } from '@/components/animated/SkeletonLoader';
import { EventCard } from '@/components/events/EventCard';
import { useEvents } from '@/hooks/useEvents';
import { useSavedEvents } from '@/hooks/useSavedEvents';
import { EventCategory } from '@/types/database';
import { Search, Bookmark } from 'lucide-react';

interface ParticipantDashboardProps {
  userName: string;
  userId: string;
}

const categories: (EventCategory | 'All')[] = ['All', 'Tech', 'Music', 'Sports', 'Arts', 'Business', 'Other'];

export const ParticipantDashboard = ({ userName, userId }: ParticipantDashboardProps) => {
  const navigate = useNavigate();
  const { events, loading, fetchPublishedEvents } = useEvents();
  const { isSaved, toggleSave } = useSavedEvents(userId);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'All'>('All');

  useEffect(() => {
    fetchPublishedEvents();
  }, [fetchPublishedEvents]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
      const matchesSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.venue?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, activeCategory, search]);

  const savedEvents = useMemo(() => {
    return events.filter((e) => isSaved(e.id));
  }, [events, isSaved]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <p className="text-sm text-muted-foreground">Participant Dashboard</p>
        <h1 className="text-2xl font-bold">
          Welcome, <span className="gradient-text">{userName}</span>
        </h1>
      </motion.div>

      {/* Search */}
      <GlassCard className="flex items-center gap-3 !p-3" hover={false}>
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events..."
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </GlassCard>

      {/* Category filters */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex gap-2 flex-wrap"
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'gradient-bg text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]'
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <GlassCard>
            <p className="text-muted-foreground text-center py-12">
              {search || activeCategory !== 'All'
                ? 'No events match your filters.'
                : 'No published events yet. Check back later!'}
            </p>
          </GlassCard>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                variant="participant"
                index={i}
                isSaved={isSaved(event.id)}
                onToggleSave={() => toggleSave(event.id)}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Saved Events */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-semibold">Saved Events</h2>
        </div>
        {savedEvents.length === 0 ? (
          <GlassCard>
            <p className="text-muted-foreground text-center py-8">
              Bookmark events to see them here.
            </p>
          </GlassCard>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {savedEvents.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                variant="participant"
                index={i}
                isSaved
                onToggleSave={() => toggleSave(event.id)}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

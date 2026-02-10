import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/animations/config';
import { GlassCard } from '@/components/animated/GlassCard';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { SlidePanel } from '@/components/animated/SlidePanel';
import { SkeletonLoader } from '@/components/animated/SkeletonLoader';
import { EventCard } from '@/components/events/EventCard';
import { EventForm } from '@/components/events/EventForm';
import { useEvents } from '@/hooks/useEvents';
import { Event, EventCategory } from '@/types/database';
import { Calendar, Eye, FileText, Plus } from 'lucide-react';

interface OrganiserDashboardProps {
  userName: string;
  userId: string;
}

export const OrganiserDashboard = ({ userName, userId }: OrganiserDashboardProps) => {
  const { events, loading, fetchMyEvents, createEvent, updateEvent, deleteEvent, togglePublish, uploadPoster } = useEvents(userId);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const published = events.filter((e) => e.is_published).length;
  const drafts = events.filter((e) => !e.is_published).length;

  const stats = [
    { label: 'Total Events', value: String(events.length), icon: Calendar },
    { label: 'Published', value: String(published), icon: Eye },
    { label: 'Drafts', value: String(drafts), icon: FileText },
  ];

  const handleCreate = async (
    data: { title: string; description: string; date: string; time: string; venue: string; rules: string; category: EventCategory; registration_link: string },
    posterFile: File | null
  ) => {
    const event = await createEvent({
      ...data,
      organiser_id: userId,
      is_published: false,
      poster_url: null,
      registration_link: data.registration_link || null,
      description: data.description || null,
      rules: data.rules || null,
    });

    if (posterFile) {
      const url = await uploadPoster(posterFile, event.id);
      await updateEvent(event.id, { poster_url: url });
    }

    setPanelOpen(false);
  };

  const handleEdit = async (
    data: { title: string; description: string; date: string; time: string; venue: string; rules: string; category: EventCategory; registration_link: string },
    posterFile: File | null
  ) => {
    if (!editingEvent) return;

    let posterUrl = editingEvent.poster_url;
    if (posterFile) {
      posterUrl = await uploadPoster(posterFile, editingEvent.id);
    }

    await updateEvent(editingEvent.id, {
      ...data,
      poster_url: posterUrl,
      description: data.description || null,
      rules: data.rules || null,
      registration_link: data.registration_link || null,
    });

    setEditingEvent(null);
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    setDeleteConfirm(null);
  };

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

        <AnimatedButton variant="glow" size="md" onClick={() => setPanelOpen(true)}>
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

      {/* My Events */}
      <div>
        <h2 className="text-lg font-semibold mb-4">My Events</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <SkeletonLoader key={i} variant="card" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <GlassCard>
            <p className="text-muted-foreground text-center py-12">
              No events yet. Create your first event to get started!
            </p>
          </GlassCard>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                variant="organiser"
                index={i}
                onEdit={() => setEditingEvent(event)}
                onDelete={() => setDeleteConfirm(event.id)}
                onTogglePublish={() => togglePublish(event.id, !event.is_published)}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Create Panel */}
      <SlidePanel open={panelOpen} onClose={() => setPanelOpen(false)} title="Create Event">
        <EventForm onSubmit={handleCreate} submitLabel="Create Event" />
      </SlidePanel>

      {/* Edit Panel */}
      <SlidePanel
        open={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        title="Edit Event"
      >
        {editingEvent && (
          <EventForm
            key={editingEvent.id}
            initialData={editingEvent}
            onSubmit={handleEdit}
            submitLabel="Save Changes"
          />
        )}
      </SlidePanel>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm"
          onClick={() => setDeleteConfirm(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-xl p-6 max-w-sm mx-4"
          >
            <h3 className="text-lg font-bold mb-2">Delete Event?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This action cannot be undone. The event will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <AnimatedButton variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)} className="flex-1">
                Cancel
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                size="sm"
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 !bg-destructive hover:!bg-destructive/90"
              >
                Delete
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '@/components/animated/PageTransition';
import { GlassCard } from '@/components/animated/GlassCard';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { BottomSheet } from '@/components/animated/BottomSheet';
import { useAuth } from '@/hooks/useAuth';
import { useSavedEvents } from '@/hooks/useSavedEvents';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/database';
import { fadeInUp, springOvershoot } from '@/animations/config';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ExternalLink,
  BookmarkPlus,
  BookmarkCheck,
  Check,
  FileText,
} from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedEvents(user?.id);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      if (data) setEvent(data as Event);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleRegister = () => {
    setSheetOpen(true);
  };

  const handleConfirmRegister = () => {
    if (event?.registration_link) {
      window.open(event.registration_link, '_blank');
    }
    setRegistered(true);
    setTimeout(() => setSheetOpen(false), 1500);
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

  if (!event) {
    return (
      <PageTransition variant="fadeSlide" className="min-h-screen bg-background flex items-center justify-center">
        <GlassCard className="text-center">
          <p className="text-muted-foreground mb-4">Event not found</p>
          <AnimatedButton variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </AnimatedButton>
        </GlassCard>
      </PageTransition>
    );
  }

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const saved = id ? isSaved(id) : false;

  return (
    <PageTransition variant="fadeSlide" className="min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-orb w-[400px] h-[400px] bg-primary/10 -top-48 -right-48" />
        <div className="floating-orb w-[300px] h-[300px] bg-accent/10 bottom-0 -left-32" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </motion.button>

        {/* Poster */}
        {event.poster_url && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="rounded-2xl overflow-hidden mb-8 h-64 md:h-80"
          >
            <img
              src={event.poster_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Title + bookmark */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium gradient-bg text-primary-foreground mb-3">
              {event.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
          </motion.div>

          {user && id && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSave(id)}
              className="mt-2 flex-shrink-0"
            >
              {saved ? (
                <BookmarkCheck className="w-6 h-6 text-primary" />
              ) : (
                <BookmarkPlus className="w-6 h-6 text-muted-foreground" />
              )}
            </motion.button>
          )}
        </div>

        {/* Meta info */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {formattedDate && (
            <GlassCard className="flex items-center gap-3 !p-4" hover={false}>
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">{formattedDate}</p>
              </div>
            </GlassCard>
          )}
          {event.time && (
            <GlassCard className="flex items-center gap-3 !p-4" hover={false}>
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="text-sm font-medium">{event.time}</p>
              </div>
            </GlassCard>
          )}
          {event.venue && (
            <GlassCard className="flex items-center gap-3 !p-4" hover={false}>
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Venue</p>
                <p className="text-sm font-medium">{event.venue}</p>
              </div>
            </GlassCard>
          )}
        </motion.div>

        {/* Description */}
        {event.description && (
          <GlassCard className="mb-6" hover={false} delay={0.15}>
            <h2 className="text-lg font-semibold mb-3">About this Event</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{event.description}</p>
          </GlassCard>
        )}

        {/* Rules */}
        {event.rules && (
          <GlassCard className="mb-6" hover={false} delay={0.2}>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Rules & Guidelines</h2>
            </div>
            <p className="text-muted-foreground whitespace-pre-wrap">{event.rules}</p>
          </GlassCard>
        )}

        {/* Register button */}
        {event.registration_link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatedButton variant="glow" size="lg" className="w-full" onClick={handleRegister}>
              <ExternalLink className="w-5 h-5 mr-2" />
              Register for this Event
            </AnimatedButton>
          </motion.div>
        )}
      </div>

      {/* Registration Bottom Sheet */}
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        {registered ? (
          <motion.div className="text-center py-6">
            {/* Success checkmark SVG animation */}
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="mx-auto mb-4"
            >
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.path
                d="M20 32 L28 40 L44 24"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              />
            </motion.svg>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springOvershoot}
              className="text-lg font-semibold gradient-text"
            >
              Registration opened!
            </motion.p>
            <p className="text-sm text-muted-foreground mt-1">
              Complete the form in the new tab
            </p>
          </motion.div>
        ) : (
          <div className="text-center py-4">
            <h3 className="text-xl font-bold mb-2">Register for Event</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              You'll be redirected to an external registration form.
            </p>
            <AnimatedButton variant="glow" size="lg" className="w-full" onClick={handleConfirmRegister}>
              Open Registration Form
              <ExternalLink className="w-4 h-4 ml-2" />
            </AnimatedButton>
          </div>
        )}
      </BottomSheet>
    </PageTransition>
  );
};

export default EventDetail;

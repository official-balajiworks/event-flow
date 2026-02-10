import { motion } from 'framer-motion';
import { fadeInUp, durations } from '@/animations/config';
import { Event } from '@/types/database';
import { Calendar, MapPin, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  variant?: 'organiser' | 'participant';
  isSaved?: boolean;
  onToggleSave?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePublish?: () => void;
  onClick?: () => void;
  index?: number;
}

export const EventCard = ({
  event,
  variant = 'participant',
  isSaved,
  onToggleSave,
  onEdit,
  onDelete,
  onTogglePublish,
  onClick,
  index = 0,
}: EventCardProps) => {
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 12px 40px hsl(0 0% 0% / 0.4)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'glass-card rounded-xl overflow-hidden cursor-pointer group',
        'transition-all'
      )}
    >
      {/* Poster */}
      <div className="relative h-44 bg-muted/20 overflow-hidden">
        {event.poster_url ? (
          <img
            src={event.poster_url}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center animated-gradient opacity-40">
            <Calendar className="w-12 h-12 text-foreground/20" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium gradient-bg text-primary-foreground">
          {event.category}
        </span>

        {/* Bookmark button for participants */}
        {variant === 'participant' && onToggleSave && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isSaved ? 'hsl(var(--primary))' : 'none'}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </motion.svg>
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 truncate">{event.title}</h3>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          )}
          {event.venue && (
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {event.venue}
            </span>
          )}
        </div>

        {event.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
        )}

        {/* Organiser actions */}
        {variant === 'organiser' && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onTogglePublish?.();
              }}
              className={cn(
                'flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all',
                event.is_published
                  ? 'bg-accent/20 text-accent'
                  : 'bg-muted/30 text-muted-foreground'
              )}
            >
              {event.is_published ? (
                <>
                  <Eye className="w-3 h-3" /> Published
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3" /> Draft
                </>
              )}
            </motion.button>

            <div className="flex-1" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted/50 text-muted-foreground"
            >
              <Edit className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

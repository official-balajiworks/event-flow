import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Crown, Users } from 'lucide-react';
import { radialItem, durations } from '@/animations/config';
import { AppRole } from '@/types/database';
import { cn } from '@/lib/utils';

interface RadialMenuProps {
  activeRole: AppRole;
  onSwitch: (role: AppRole) => void;
}

const roleItems: { role: AppRole; icon: typeof Crown; label: string }[] = [
  { role: 'organiser', icon: Crown, label: 'Organiser' },
  { role: 'participant', icon: Users, label: 'Participant' },
];

export const RadialMenu = ({ activeRole, onSwitch }: RadialMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (role: AppRole) => {
    onSwitch(role);
    setOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.fast }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu container */}
      <div className="fixed top-6 right-6 z-50">
        {/* Radial items */}
        <AnimatePresence>
          {open &&
            roleItems.map((item, i) => {
              const variants = radialItem(i, roleItems.length);
              const isActive = activeRole === item.role;
              return (
                <motion.button
                  key={item.role}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => handleSelect(item.role)}
                  className={cn(
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'flex flex-col items-center justify-center gap-1',
                    'w-16 h-16 rounded-full glass-card',
                    'text-xs font-medium transition-colors',
                    isActive
                      ? 'border-primary/60 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px]">{item.label}</span>
                </motion.button>
              );
            })}
        </AnimatePresence>

        {/* Center toggle button */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            'relative z-10 w-12 h-12 rounded-full flex items-center justify-center',
            'glass-card border border-border/50',
            open && 'border-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
          )}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: durations.fast }}
              >
                <X className="w-5 h-5 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: durations.fast }}
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/animated/AnimatedButton';
import { fadeInUp } from '@/animations/config';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { EventCategory } from '@/types/database';

const categories: EventCategory[] = ['Tech', 'Music', 'Sports', 'Arts', 'Business', 'Other'];

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  rules: string;
  category: EventCategory;
  registration_link: string;
}

interface EventFormProps {
  initialData?: Partial<EventFormData & { poster_url: string | null }>;
  onSubmit: (data: EventFormData, posterFile: File | null) => Promise<void>;
  submitLabel: string;
}

export const EventForm = ({ initialData, onSubmit, submitLabel }: EventFormProps) => {
  const [form, setForm] = useState<EventFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    venue: initialData?.venue || '',
    rules: initialData?.rules || '',
    category: initialData?.category || 'Tech',
    registration_link: initialData?.registration_link || '',
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(initialData?.poster_url || null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof EventFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (file: File) => {
    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const removePoster = () => {
    setPosterFile(null);
    setPosterPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form, posterFile);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-muted/30 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all';

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Title</label>
        <input
          className={inputClass}
          placeholder="Event title"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Description</label>
        <textarea
          className={`${inputClass} min-h-[100px] resize-none`}
          placeholder="Event description"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Time</label>
          <input
            type="time"
            className={inputClass}
            value={form.time}
            onChange={(e) => handleChange('time', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Venue */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Venue</label>
        <input
          className={inputClass}
          placeholder="Event venue"
          value={form.venue}
          onChange={(e) => handleChange('venue', e.target.value)}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChange('category', cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                form.category === cat
                  ? 'gradient-bg text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]'
                  : 'glass-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Rules */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Rules (optional)</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-none`}
          placeholder="Event rules or guidelines"
          value={form.rules}
          onChange={(e) => handleChange('rules', e.target.value)}
        />
      </div>

      {/* Registration Link */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Registration Link (Google Form)</label>
        <input
          className={inputClass}
          placeholder="https://forms.google.com/..."
          value={form.registration_link}
          onChange={(e) => handleChange('registration_link', e.target.value)}
        />
      </div>

      {/* Poster Upload */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Event Poster</label>
        {posterPreview ? (
          <div className="relative rounded-xl overflow-hidden border border-border/50">
            <img src={posterPreview} alt="Poster preview" className="w-full h-48 object-cover" />
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removePoster}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        ) : (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {/* Submit */}
      <AnimatedButton
        type="submit"
        variant="glow"
        size="lg"
        className="w-full"
        disabled={submitting}
      >
        {submitting ? 'Saving...' : submitLabel}
      </AnimatedButton>
    </motion.form>
  );
};

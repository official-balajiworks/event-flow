import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export const useSavedEvents = (userId?: string) => {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchSaved = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from('saved_events')
      .select('event_id')
      .eq('user_id', userId);

    if (data) setSavedIds(new Set(data.map((s) => s.event_id)));
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  const toggleSave = async (eventId: string) => {
    if (!userId) return;

    if (savedIds.has(eventId)) {
      await supabase
        .from('saved_events')
        .delete()
        .eq('user_id', userId)
        .eq('event_id', eventId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    } else {
      await supabase
        .from('saved_events')
        .insert({ user_id: userId, event_id: eventId });
      setSavedIds((prev) => new Set(prev).add(eventId));
    }
  };

  const isSaved = (eventId: string) => savedIds.has(eventId);

  return { savedIds, loading, toggleSave, isSaved };
};

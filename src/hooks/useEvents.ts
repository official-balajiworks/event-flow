import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/database';

export const useEvents = (organiserId?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = useCallback(async () => {
    if (!organiserId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organiser_id', organiserId)
      .order('created_at', { ascending: false });

    if (!error && data) setEvents(data as Event[]);
    setLoading(false);
  }, [organiserId]);

  const fetchPublishedEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .order('date', { ascending: true });

    if (!error && data) setEvents(data as Event[]);
    setLoading(false);
  }, []);

  const createEvent = async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();
    if (error) throw error;
    setEvents((prev) => [data as Event, ...prev]);
    return data as Event;
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    setEvents((prev) => prev.map((e) => (e.id === id ? (data as Event) : e)));
    return data as Event;
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const togglePublish = async (id: string, isPublished: boolean) => {
    return updateEvent(id, { is_published: isPublished });
  };

  const uploadPoster = async (file: File, eventId: string) => {
    const ext = file.name.split('.').pop();
    const path = `${eventId}/poster.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('event-posters')
      .upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('event-posters').getPublicUrl(path);
    return data.publicUrl;
  };

  return {
    events,
    loading,
    fetchMyEvents,
    fetchPublishedEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    togglePublish,
    uploadPoster,
  };
};

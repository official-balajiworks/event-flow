export type AppRole = 'organiser' | 'participant';

export type EventCategory = 'Tech' | 'Music' | 'Sports' | 'Arts' | 'Business' | 'Other';

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

export interface Event {
  id: string;
  organiser_id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  venue: string;
  rules: string | null;
  category: EventCategory;
  poster_url: string | null;
  registration_link: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavedEvent {
  id: string;
  user_id: string;
  event_id: string;
  saved_at: string;
}

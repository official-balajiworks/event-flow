import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aplmqrgjzpsbbiezwfri.supabase.co';
const supabaseAnonKey = 'sb_publishable_PtVQDBvVtOh3uxE-Arrj8w_w-lkJfPo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { AppRole } from '@/types/database';

export const useRole = (userId: string | undefined) => {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [activeRole, setActiveRole] = useState<AppRole>('participant');
  const [loading, setLoading] = useState(true);

  // Fetch existing roles from DB
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchRoles = async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (!error && data) {
        const userRoles = data.map((r) => r.role as AppRole);
        setRoles(userRoles);

        // Default to first role found, or participant
        if (userRoles.length > 0) {
          setActiveRole(userRoles[0]);
        }
      }
      setLoading(false);
    };

    fetchRoles();
  }, [userId]);

  // Switch or add a role
  const switchRole = useCallback(
    async (role: AppRole) => {
      if (!userId) return;

      // If user doesn't have this role yet, insert it
      if (!roles.includes(role)) {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role });

        if (!error) {
          setRoles((prev) => [...prev, role]);
        }
      }

      setActiveRole(role);
    },
    [userId, roles]
  );

  return { roles, activeRole, switchRole, loading };
};

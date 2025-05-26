import { supabase } from '@/utils/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetEvents = () => {
  return useQuery({
    queryKey: ['trackevents'],
    queryFn: async () => {
      const { data, error } = await supabase.from('trackevents').select('*');
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

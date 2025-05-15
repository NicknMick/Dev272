import {supabase} from "@/utils/supabase";
import {useQuery} from "@tanstack/react-query";

export const useGetEvents = () => {
    return useQuery({
        queryKey: ['TrackEvents'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('TrackEvents')
                .select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data;
        },
        staleTime: 1000 * 60 * 5,
    })
}
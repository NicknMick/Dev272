import {supabase} from "@/utils/supabase";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export type SupabaseNewEvent = Omit<Event, 'id'>;

export const useAddEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newEvent: SupabaseNewEvent) => {
            const {data, error} = await supabase
                .from('trackevents')
                .insert(newEvent)
            if (error) {
                throw new Error(error.message);
            }
            return data
        },
        onSuccess: () => {
            console.log("Data insertion success!")
            queryClient.invalidateQueries({queryKey: ['events']})
        },
    })
}
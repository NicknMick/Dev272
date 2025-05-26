import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetEvents } from '@/hooks/useGetEvents';
import { SupabaseNewEvent, useAddEvent } from '@/hooks/useAddEvent';

export type Event = {
  title: string;
  type: string;
  description: string;
  record: string;
  recordHolder: string;
  eventID: string;
  isFavorite: boolean;
};

type EventContextType = {
  isLoading: boolean;
  events: Event[];
  addEvent: (event: SupabaseNewEvent) => void;
  toggleFavorite: (id: string) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isFetching } = useGetEvents();
  const addEventMutation = useAddEvent();
  //const updateEventMutation

  const [events, setEvents] = useState<Event[]>([]);

  const toggleFavorite = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.eventID === id
          ? { ...event, isFavorite: !event.isFavorite }
          : event,
      ),
    );
  };

  const addEvent = async (event: SupabaseNewEvent) => {
    addEventMutation.mutate(event);
  };

  useEffect(() => {
    if (data && !isFetching) {
      setEvents(data as Event[]);
    }
  }, [data, isFetching]);

  return (
    <EventContext.Provider
      value={{
        isLoading: isFetching || addEventMutation.isPending,
        events,
        toggleFavorite,
        addEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('Event context must be used in a event provider!');
  }
  return context;
};

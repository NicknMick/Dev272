import React, { createContext, useContext, useState } from "react";
import trackEventsData from '@/data/trackEventsData.json';

export type Event = {
    title: string;
    type: string;
    description: string;
    record: string;
    recordHolder: string;
    eventID: string;
    isFavorite: boolean;
}

type EventContextType = {
    events: Event[];
    addEvent: (event: Event) =>  void;
    toggleFavorite: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [events, setEvents] = useState<Event[]>(trackEventsData as Event[]);

    const toggleFavorite = (id: string) => {
        setEvents((prev) =>
            prev.map((event) =>
                event.eventID === id ? {...event, isFavorite: !event.isFavorite} : event
            )
        );
    };

    const addEvent = (event: Event) => {
        setEvents((prev) => [...prev, event])
    }

    return (
        <EventContext.Provider value={{events, toggleFavorite, addEvent}}>
            {children}
        </EventContext.Provider>
    )
}

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("Event context must be used in a event provider!");
    }
    return context;
}
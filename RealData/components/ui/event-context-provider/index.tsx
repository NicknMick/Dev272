import React, {createContext, useContext, useEffect, useState} from "react";
import {useGetEvents} from "@/hooks/useGetEvents";

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
    isLoading: boolean
    events: Event[];
    addEvent: (event: Event) =>  void;
    toggleFavorite: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {data, isFetching} = useGetEvents();

    const [events, setEvents] = useState<Event[]>([]);

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

    useEffect(() => {
        if (data && !isFetching) {
            console.log("Fetched Data!", data);
            setEvents(data as Event[])
        }
        if (isFetching) {
            console.log("Fetching data...");
        }
    }, [data, isFetching])

    return (
        <EventContext.Provider value={{isLoading: isFetching, events, toggleFavorite, addEvent}}>
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
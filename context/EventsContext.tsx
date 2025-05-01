import React, { createContext, useContext, useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  isRegistered?: boolean;
}

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'registeredCount' | 'status'>) => void;
  registerForEvent: (eventId: string) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (newEvent: Omit<Event, 'id' | 'registeredCount' | 'status'>) => {
    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEvent,
      registeredCount: 0,
      status: 'upcoming',
    };
    setEvents(currentEvents => [...currentEvents, event]);
  };

  const registerForEvent = (eventId: string) => {
    setEvents(currentEvents =>
      currentEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              registeredCount: event.registeredCount + 1,
              isRegistered: true,
            }
          : event
      )
    );
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, registerForEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
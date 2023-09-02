// "use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FirebaseEvent, getUserEvents  } from '@/firebase/firestore/get_data';
import { DocumentSnapshot } from 'firebase/firestore';
import { useAuthContext } from "./AuthContext";

interface EventDelete {
  eventName: string;
    eventId: string;
}

// Define the types for the context
interface EventContextData {
  getEvents: () => void
  userEvents: FirebaseEvent[] | undefined;
  setUserEvents: React.Dispatch<React.SetStateAction<FirebaseEvent[] | undefined>>
  loading: boolean;
  setCurrentCount: React.Dispatch<React.SetStateAction<number>>
  currentCount: number
  eventDelete: EventDelete | undefined
  setEventDelete: React.Dispatch<React.SetStateAction<EventDelete | undefined>>
}

interface EventContextProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextData | undefined>(undefined);

export const useEventContext = (): EventContextData => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventContextProvider');
  }
  return context;
};

export const UserEventContextProvider: React.FC<EventContextProviderProps> = ({ children }) => {
  const [userEvents, setUserEvents] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [lastDocSnapshot, setLastDocSnapshot] = useState<DocumentSnapshot | null>(null); // Initialize lastDocSnapshot
  const [eventDelete, setEventDelete] = useState<EventDelete>()

  const { user } = useAuthContext()

  const getEvents = () => {
    if (user) {
      setLoading(true)
      const userId = user.uid;
      console.log('This is the userId', userId)
      getUserEvents(userId, setUserEvents, setLoading, lastDocSnapshot, setLastDocSnapshot, currentCount);
    }
  }

  // useEffect(() => {
   
  // }, [user, currentCount]);

  const contextValue: EventContextData = {
    getEvents,
    userEvents,
    setUserEvents,
    loading,
    currentCount,
    setCurrentCount,
    eventDelete,
    setEventDelete,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

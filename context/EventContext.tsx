// "use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FirebaseEvent, getEvents, getCategoryEvents  } from '@/firebase/firestore/get_data';
import { DocumentSnapshot } from 'firebase/firestore';

// Define the types for the context
interface EventContextData {
  firebaseEvents: FirebaseEvent[] | undefined;
  loading: boolean;
  getCategory: (category: string) => Promise<void>;
  setCurrentCount: React.Dispatch<React.SetStateAction<number>>
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

export const EventContextProvider: React.FC<EventContextProviderProps> = ({ children }) => {
  const [firebaseEvents, setFirebaseEvents] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [lastDocSnapshot, setLastDocSnapshot] = useState<DocumentSnapshot | null>(null); // Initialize lastDocSnapshot



  const getCategory = async (category: string) => {

    setLastDocSnapshot(null)
    setFirebaseEvents([])
    setLastDocSnapshot(null)
    setCurrentCount(0)

    if (category === 'All') {
      getEvents(setFirebaseEvents, setLoading, lastDocSnapshot, setLastDocSnapshot, currentCount);
      return;
    }
    setLoading(true);
    await getCategoryEvents(category, setFirebaseEvents, 8);
    setLoading(false);
  };

  useEffect(() => {
    getEvents(setFirebaseEvents, setLoading, lastDocSnapshot, setLastDocSnapshot, currentCount);
  }, [currentCount]);

  const contextValue: EventContextData = {
    firebaseEvents,
    loading,
    getCategory,
    setCurrentCount,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

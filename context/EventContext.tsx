'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FirebaseEvent, getEvents, getCategoryEvents  } from '@/firebase/firestore/get_data';
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

// Define the types for the context
interface EventContextData {
  firebaseEvents: FirebaseEvent[] | undefined;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  getCategory: () => Promise<void>
  getAllEvents: () => Promise<void>
  getAllCategoryEvents: () => Promise<void>
  setCurrentCount: React.Dispatch<React.SetStateAction<number>>
  lastDocSnapshot: QueryDocumentSnapshot<DocumentData, DocumentData> | null
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [lastDocSnapshot, setLastDocSnapshot] = useState<QueryDocumentSnapshot | null>(null); // Initialize lastDocSnapshot

  const getAllEvents = async (lastDocSnap = lastDocSnapshot) => {
    getEvents(setFirebaseEvents, setLoading, lastDocSnap, setLastDocSnapshot);
  }

  const getAllCategoryEvents = async (lastDocSnap = lastDocSnapshot) => {
    getCategoryEvents(setFirebaseEvents, setLoading, lastDocSnap, setLastDocSnapshot, selectedCategory);
  } 


  const getCategory = async () => {
    console.log('This is the curent category', selectedCategory, lastDocSnapshot, firebaseEvents);
    setLoading(true);
    setLastDocSnapshot(null)
    setFirebaseEvents([])
    setCurrentCount(0)

    if (selectedCategory === 'All') {
      getAllEvents(null);
      return;
    }

    getAllCategoryEvents(null)
    // setLoading(false);
  };

  const contextValue: EventContextData = {
    firebaseEvents,
    selectedCategory,
    setSelectedCategory,
    loading,
    getCategory,
    getAllEvents,
    getAllCategoryEvents,
    setCurrentCount,
    lastDocSnapshot
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

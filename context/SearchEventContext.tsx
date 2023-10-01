import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FirebaseEvent, searchEvents } from '@/firebase/firestore/get_data'; // Assuming you have a function for searching events.
import { useAuthContext } from './AuthContext';

export interface EventOptions {when?: string, where?: string, category?: string, price?: string}

// Define the types for the context
interface SearchEventContextData {
  searchResults: FirebaseEvent[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<FirebaseEvent[] | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  query: string; // The search query string.
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  category: string; // The selected category for filtering.
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  when: string; // The selected date/time for filtering.
  setWhen: React.Dispatch<React.SetStateAction<string>>;
  where: string; // The selected location for filtering.
  setWhere: React.Dispatch<React.SetStateAction<string>>;
  price: string; // The selected price range for filtering.
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  searchUrl: string; // The URL for the current search (if needed).
  setSearchUrl: React.Dispatch<React.SetStateAction<string>>;
  searchOptions: EventOptions | undefined; // The URL for the current search (if needed).
  setSearchOptions: React.Dispatch<React.SetStateAction<EventOptions | undefined>>;
}


interface SearchEventContextProviderProps {
  children: ReactNode;
}

const SearchEventContext = createContext<SearchEventContextData | undefined>(undefined);

export const useSearchEventContext = (): SearchEventContextData => {
  const context = useContext(SearchEventContext);
  if (!context) {
    throw new Error('useSearchEventContext must be used within a SearchEventContextProvider');
  }
  return context;
};

export const SearchEventContextProvider: React.FC<SearchEventContextProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [when, setWhen] = useState('') 
  const [where, setWhere] = useState('')
  const [price, setPrice] = useState('')
  const [searchUrl, setSearchUrl] = useState('/')
  const [searchOptions, setSearchOptions] = useState<EventOptions>()
  // const [searchOptions, setSearchOptions] = useState<EventOptions>({category: 'Arts & Culture', when: 'Today', where: 'Lagos', price: 'Free'})

  const contextValue: SearchEventContextData = {
    searchResults,
    setSearchResults,
    loading,
    setLoading,
    query,
    setQuery,
    category,
    setCategory,
    when,
    setWhen,
    where,
    setWhere,
    price,
    setPrice,
    searchUrl,
    setSearchUrl,
    searchOptions,
    setSearchOptions,
  };

  return (
    <SearchEventContext.Provider value={contextValue}>
      {children}
    </SearchEventContext.Provider>
  );
};

import { Dispatch, SetStateAction } from "react";
import { db } from "../config";
import { doc, DocumentReference, getDoc, DocumentSnapshot, collection, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, where, getDocs, limit, Timestamp, collectionGroup, orderBy, startAfter, DocumentData, deleteDoc } from "firebase/firestore";
import { errorMessage } from "../error_message";
import { convertToTimestamp, getDateRange } from '@/utils/func';
import { successMessage } from "../success_message";

export interface FirebaseEvent {
  data: any; // Replace 'any' with your specific data type
  id: string;
}

export interface SearchOptions {
  searchTerm?: string;
  category?: string;
  venue?: string;
  // date?: Timestamp;
  date?: string;
  price?: string;
}



export async function getDocument(collection: string, id: string): Promise<{ data: any; error: any }> {
    const docRef: DocumentReference = doc(db, collection, id);

    let data: any = null;
    let error: any = null;

    try {
        const result: DocumentSnapshot = await getDoc(docRef);
        data = result.data();
        if (result.exists()) {
          console.log("Document data:", result.data());
        } else {
          console.log("No such document!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        
    } catch (e) {
        error = e;
    }

    return { data, error };
}

export const getEvents = (
  setEvents: Dispatch<SetStateAction<FirebaseEvent[] | undefined>>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
  lastDocSnapshot: DocumentSnapshot | null, // Add lastDocSnapshot parameter
  setLastDocSnapshot: Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>>,
  currentCount: number
) => {
  try {
    const batchSize = 8; // Number of events to fetch at once
    console.log('This is the current count number', currentCount);
    const q = query(
      collection(db, 'events'),
      where('isApproved', '==', true),
      orderBy('eventDate'), // Assuming you have a timestamp field
      lastDocSnapshot ? startAfter(lastDocSnapshot) : startAfter(0), // Start after the current count
      limit(batchSize)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const firebaseEvents: FirebaseEvent[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        firebaseEvents.push({ data: doc.data(), id: doc.id });
      });
      setEvents((prevEvents) => [...(prevEvents || []), ...firebaseEvents]);
      setLoading(false);
      console.log('These are the firebase events:', firebaseEvents);

      // Get the last document's snapshot for the next batch
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
      if (lastDocument) {
        // lastDocSnapshot = lastDocument; // Update lastDocSnapshot
        setLastDocSnapshot(lastDocument)
      }

    });

    return () => unsubscribe();
  } catch (e) {
    console.error(e);
    // return errorMessage(error)
  }
};

export const getUserEvents = (
  id: string,
  setEvents: Dispatch<SetStateAction<FirebaseEvent[] | undefined>>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
  lastDocSnapshot: DocumentSnapshot | null,
  setLastDocSnapshot: Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData, DocumentData> | null>>,
  currentCount: number
) => {
  try {
    const batchSize = 8; // Number of events to fetch at once
    console.log('This is the current count number', currentCount); 
    const q = query(
      collection(db, 'events'),
      where('userId', '==', id),
      orderBy('eventDate'), // Assuming you have a timestamp field
      lastDocSnapshot ? startAfter(lastDocSnapshot) : startAfter(0), // Start after the current count
      limit(batchSize)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const firebaseEvents: FirebaseEvent[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        firebaseEvents.push({ data: doc.data(), id: doc.id });
      });
      setEvents((prevEvents) => [...(prevEvents || []), ...firebaseEvents]);
      setLoading(false);
      console.log('These are the user events:', firebaseEvents);

      // Get the last document's snapshot for the next batch
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
      if (lastDocument) {
        // lastDocSnapshot = lastDocument; // Update lastDocSnapshot
        setLastDocSnapshot(lastDocument)
      }

    });

    return () => unsubscribe();
  } catch (e) {
    console.error(e);
    // return errorMessage(error)
  }
};

export const getCategoryEvents = async (category: string, setEvents: (events: FirebaseEvent[]) => void, limitValue = 4) => {
  try {
    const q = query(collection(db, 'events'), where('eventCategory', '==', category), limit(limitValue));

    const querySnapshot = await getDocs(q);
    const firebaseEvents: FirebaseEvent[] = [];

    querySnapshot.forEach((doc) => {
      firebaseEvents.push({ data: doc.data(), id: doc.id });
    });

    return setEvents(firebaseEvents);

  } catch (error) {
    console.error(error);
  }
};

export const getSimilarEvents = async (category: string, setEvents: (events: FirebaseEvent[]) => void, limitValue = 4) => {
  try {
    const q = query(collection(db, 'events'), where('eventCategory', '==', category), limit(limitValue));

    const querySnapshot = await getDocs(q);
    const firebaseEvents: FirebaseEvent[] = [];

    querySnapshot.forEach((doc) => {
      firebaseEvents.push({ data: doc.data(), id: doc.id });
    });

    return setEvents(firebaseEvents);

  } catch (error) {
    console.error(error);
  }
};

export const searchEvents = async (options: SearchOptions, setEvents: (events: FirebaseEvent[]) => void) => {
  try {
    let q = collectionGroup(db, 'events');

    if (options.searchTerm) {
      q = query(q, where('eventName', '==', options.searchTerm));
      // const searchTerms = options.searchTerm.toLowerCase().split(" ");
      // const searchQueries = searchTerms.map(term => term.trim());

      // q = query(q, where('eventName', 'array-contains-any', searchQueries));

    }
    if (options.category) {
      q = query(q, where('eventCategory', '==', options.category));
    }
    if (options.venue) {
      q = query(q, where('eventState', '==', options.venue));
    }
    if (options.date) {
      const [beginningDate, endDate] = getDateRange(options.date);

      if(options.date === 'Today') {
        const [beyondDate = beginningDate, endDate] = getDateRange('Beyond');
        q = query(q, where('eventDate', '>=', convertToTimestamp(beginningDate)), where('eventDate', '<=', convertToTimestamp(beyondDate)));
      }

      if(options.date === 'Beyond') {
        console.log('This is the date for today', beginningDate)
        q = query(q, where('eventDate', '>=', convertToTimestamp(beginningDate)));
      }

      if(options.date !== 'Today' && options.date !== 'Beyond') {
        console.log('This is the date for' + options.date, beginningDate, endDate)
        q = query(q, where('eventDate', '>=', convertToTimestamp(beginningDate)), where('eventDate', '<=', convertToTimestamp(endDate)));
      }


    }
    if (options.price) {
      if(options.price === 'Free') {
        q = query(q, where('eventPrice', '==', 'free'));
      } else {
        q = query(q, where('eventPrice', '==', 'paid'));
      }
      
    }

    const querySnapshot = await getDocs( q);
    const firebaseEvents: FirebaseEvent[] = [];

    querySnapshot.forEach((doc) => {
      firebaseEvents.push({ data: doc.data(), id: doc.id });
    });

    setEvents(firebaseEvents);
  } catch (error: any) {
    console.error(error);
    errorMessage(error)
  }
};

// Define a function to delete an event by its ID
export const deleteEvent = async (eventId: string, name:string) => {
  try {
    const eventRef = doc(db, 'events', eventId);

      await deleteDoc(eventRef);
      successMessage(`${name} deleted successfully 🎉`)
      console.log(`Event with ID ${eventId} deleted successfully.`);
   
  } catch (error) {
    errorMessage("Encountered an error ❌")
    console.log(error)
    console.error(`Error deleting event with ID ${eventId}:`, error);
  }
};


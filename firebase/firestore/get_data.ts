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
          console.log("No such document!!!!!!!!!!!!!!!!!!!!!!!!!!! impossible");
          error = 'No such document!!!!!!!!!!!!!!!!!!!!!!!!!!!';
          console.log("The error string", error);
        }
        
    } catch (e) {
        error = e;
    }

    return { data, error };
}

export const getEvents = async (
  setEvents: Dispatch<SetStateAction<FirebaseEvent[] | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  lastDocSnapshot: QueryDocumentSnapshot<DocumentData> | null,
  setLastDocSnapshot: Dispatch<SetStateAction<QueryDocumentSnapshot<DocumentData, DocumentData> | null>>
) => {
  try {
    const batchSize = 8;

    // Define the base query
    const baseQuery = query(
      collection(db, 'events'),
      where('isApproved', '==', true),
      orderBy('eventDate'),
      limit(batchSize)
    );

    // If lastDocSnapshot is provided, adjust the query to start after it
    const q = lastDocSnapshot
      ? query(
          baseQuery,
          startAfter(lastDocSnapshot)
        )
      : baseQuery;

    // Fetch the data once
    const querySnapshot = await getDocs(q);

    const firebaseEvents: FirebaseEvent[] = querySnapshot.docs.map((doc) => {
      return { data: doc.data(), id: doc.id };
    });

    console.log('This is the firebase events', firebaseEvents);

    // Combine existing events with new events, filtering out duplicates by ID
    setEvents((prevEvents) => {
      if (!prevEvents) {
        return firebaseEvents;
      }

      // Create a Set to store unique event IDs
      const uniqueEventIds = new Set(prevEvents.map((event) => event.id));

      // Filter the new events to exclude duplicates by ID
      const filteredFirebaseEvents = firebaseEvents.filter(
        (event) => !uniqueEventIds.has(event.id)
      );

      // Concatenate the filtered new events with the existing events
      const combinedEvents = [...prevEvents, ...filteredFirebaseEvents];

      return combinedEvents;
    });

    setLoading(false);

    // Get the last document's snapshot for the next batch
    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    if (lastDocument) {
      setLastDocSnapshot(lastDocument);
    }
  } catch (e) {
    console.error(e);
    // Handle the error
  }
};


export const getUserEvents = async (
  id: string,
  setEvents: Dispatch<SetStateAction<FirebaseEvent[] | undefined>>,
  setLoading: Dispatch<React.SetStateAction<boolean>>,
  lastDocSnapshot: DocumentSnapshot<DocumentData, DocumentData> | null,
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

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    const firebaseEvents: FirebaseEvent[] = [];

    querySnapshot.forEach((doc) => {
      firebaseEvents.push({ data: doc.data(), id: doc.id });
    });

    setEvents((prevEvents) => [...(prevEvents || []), ...firebaseEvents]);
    setLoading(false);
    console.log('These are the user events:', firebaseEvents);

    // Get the last document's snapshot for the next batch
    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    if (lastDocument) {
      // lastDocSnapshot = lastDocument; // Update lastDocSnapshot
      setLastDocSnapshot(lastDocument);
    }
  } catch (e) {
    console.error(e);
    // Handle error
  }
};

export const getCategoryEvents = async (
  setEvents: Dispatch<SetStateAction<FirebaseEvent[] | undefined>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  lastDocSnapshot: QueryDocumentSnapshot<DocumentData> | null,
  setLastDocSnapshot: Dispatch<SetStateAction<QueryDocumentSnapshot<DocumentData> | null>>,
  category: string
) => {
  try {
    const batchSize = 8;

    // Define the base query for the specified category
    const baseQuery = query(
      collection(db, 'events'),
      where('eventCategory', '==', category),
      where('isApproved', '==', true),
      orderBy('eventDate'),
      limit(batchSize)
    );

    // If lastDocSnapshot is provided, adjust the query to start after it
    const q = lastDocSnapshot
      ? query(
          baseQuery,
          startAfter(lastDocSnapshot)
        )
      : baseQuery;

    // Fetch the data once for the specified category
    const querySnapshot = await getDocs(q);

    const firebaseEvents: FirebaseEvent[] = querySnapshot.docs.map((doc) => {
      return { data: doc.data(), id: doc.id };
    });

    console.log('This is the firebase events', firebaseEvents);

    // Combine existing events with new events, filtering out duplicates by ID
    setEvents((prevEvents) => {
      if (!prevEvents) {
        return firebaseEvents;
      }

      // Create a Set to store unique event IDs
      const uniqueEventIds = new Set(prevEvents.map((event) => event.id));

      // Filter the new events to exclude duplicates by ID
      const filteredFirebaseEvents = firebaseEvents.filter(
        (event) => !uniqueEventIds.has(event.id)
      );

      // Concatenate the filtered new events with the existing events
      const combinedEvents = [...prevEvents, ...filteredFirebaseEvents];

      return combinedEvents;
    });

    setLoading(false);

    // Get the last document's snapshot for the next batch
    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
    if (lastDocument) {
      setLastDocSnapshot(lastDocument);
    }
  } catch (e) {
    console.error(e);
    // Handle the error
  }
};

export const getSimilarEvents = async (category: string, setEvents: (events: FirebaseEvent[]) => void) => {
  try {
    const q = query(collection(db, 'events'), where('eventCategory', '==', category), limit(4));

    const querySnapshot = await getDocs(q);
    const firebaseEvents: FirebaseEvent[] = [];

    querySnapshot.forEach((doc) => {
      firebaseEvents.push({ data: doc.data(), id: doc.id });
    });

    setEvents(firebaseEvents);

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


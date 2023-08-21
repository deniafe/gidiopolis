import { Dispatch, SetStateAction } from "react";
import firebase_app, { db } from "../config";
import { doc, DocumentReference, getDoc, DocumentSnapshot, collection, onSnapshot, query, QueryDocumentSnapshot, QuerySnapshot, where, getDocs, limit, Timestamp, collectionGroup } from "firebase/firestore";
import { errorMessage } from "../error_message";
import { convertToTimestamp, formatDate, getDateRange } from '@/utils/func';

export interface FirebaseEvent {
  data: any; // Replace 'any' with your specific data type
  id: string;
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

export const getEvents = (setEvents: Dispatch<SetStateAction<FirebaseEvent[] | undefined>>, setLoading: Dispatch<React.SetStateAction<boolean>>) => {

  try {
    const q = query(collection(db, 'events'), where('isApproved', '==', true));

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const firebaseEvents: FirebaseEvent[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        firebaseEvents.push({ data: doc.data(), id: doc.id });
      });
      setEvents(firebaseEvents);
      setLoading(false)
      console.log('This is the firebase events:', firebaseEvents)
    });

    return () => unsubscribe();
  } catch (e) {
    console.error(e);
    // return errorMessage(error)
  }
};

export const getUserEvents = (id: string, setEvents: (events: FirebaseEvent[]) => void) => {
  try {
    const q = query(collection(db, 'events'), where('user_id', '==', id));

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
      const firebaseEvents: FirebaseEvent[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        firebaseEvents.push({ data: doc.data(), id: doc.id });
      });
      setEvents(firebaseEvents);
    });

    return () => unsubscribe();
  } catch (error) {
    console.error(error);
  }
};

// export const getCategoryEvents = (category: string, setEvents: (events: FirebaseEvent[]) => void) => {
//   try {
//     const q = query(collection(db, 'events'), where('eventCategory', '==', category));

//     const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
//       const firebaseEvents: FirebaseEvent[] = [];
//       querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
//         firebaseEvents.push({ data: doc.data(), id: doc.id });
//       });
//       setEvents(firebaseEvents);
//     });

//     return () => unsubscribe();
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getCategoryEvents = async (category: string, setEvents: (events: FirebaseEvent[]) => void) => {
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

export interface SearchOptions {
  searchTerm?: string;
  category?: string;
  venue?: string;
  // date?: Timestamp;
  date?: string;
  price?: string;
}

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


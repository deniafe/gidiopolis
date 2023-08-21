import { getFirestore, doc, setDoc, DocumentReference, addDoc, collection } from 'firebase/firestore';
import firebase_app, { db } from '../config';

// const db = getFirestore(firebase_app);

interface AddDataResult {
  result: void| null | DocumentReference;
  error: any;
}

async function addData(
  col: string,
  data: Record<string, any>
): Promise<AddDataResult> {

  let result: void| null | DocumentReference = null;
  let error: any = null;

  try {
    result = await addDoc(collection(db, col), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export default addData;

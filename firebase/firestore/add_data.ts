import { getFirestore, doc, setDoc, DocumentReference, addDoc, collection, updateDoc } from 'firebase/firestore';
import firebase_app, { db } from '../config';

// const db = getFirestore(firebase_app);

interface AddDataResult {
  result: void| null | DocumentReference;
  error: any;
}

interface EditDataResult {
  result: void| null | string;
  error: any;
}

export async function addData(
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

export async function editData(
  col: string,
  docId: string,
  data: Record<string, any>
): Promise<EditDataResult> {

  let result: void | null | string= null;
  let error: any = null;

  console.log('details for updating', col, docId)

  try {
    console.log('details for updating', col, docId)
    const docRef = doc(db, col, docId);
    const updatedResult = await updateDoc(docRef, data);
    console.log('Document updated result', updatedResult);
    result = 'Data successfully updated';
  } catch (e) {
    error = e;
    // console.log('Error updating', e)
  }

  return { result, error };
}

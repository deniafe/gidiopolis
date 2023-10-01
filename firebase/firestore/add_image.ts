import { getDownloadURL, ref, uploadString, deleteObject } from "firebase/storage";
import { db, storage } from "../config";
import { doc, updateDoc } from "firebase/firestore";

export async function addImage({ docRefId, eventBanner }: { docRefId: string; eventBanner: string }) {

  let imageResult = false;
  let imageError = null;

  try {
    const imageRef = ref(storage, `events/${docRefId}/image`);
    await uploadString(imageRef, eventBanner, "data_url");
    
    const downloadURL = await getDownloadURL(imageRef);
    
    await updateDoc(doc(db, "events", docRefId), {
      eventBanner: downloadURL,
    });

    console.log("Image added successfully");
    imageResult = true

  } catch (e) {
    console.error("Error adding image:", e);
    imageError = e
  }

  return { imageResult, imageError };
}


export async function deleteImage(docRefId: string) {
  let imageDeleteResult = false;
  let imageDeleteError = null;

  try {
    // Reference to the image in Firebase Storage
    const imageRef = ref(storage, `events/${docRefId}/image`);

    // Delete the image from Firebase Storage
    await deleteObject(imageRef);

    // Update the Firestore document to remove the reference to the deleted image
    await updateDoc(doc(db, "events", docRefId), {
      eventBanner: null, // Set the eventBanner field to null or remove it entirely
    });

    console.log("Image deleted successfully");
    imageDeleteResult = true;
  } catch (e) {
    console.error("Error deleting image:", e);
    imageDeleteError = e;
  }

  return { imageDeleteResult, imageDeleteError };
}


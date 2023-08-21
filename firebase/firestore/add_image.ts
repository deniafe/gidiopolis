// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { db, storage } from "../config";
// import { doc, updateDoc } from "firebase/firestore";

// export async function addImage({ docRefId, eventBanner }: {docRefId: string, eventBanner: string}) {
//   //👇🏻 Database reference to the image
//   const imageRef = ref(storage, `events/${docRefId}/image`);
//   await uploadString(imageRef, eventBanner, "data_url").then(async () => {
//       //👇🏻 Gets the image URL
//       const downloadURL = await getDownloadURL(imageRef);
//       //👇🏻 Updates the docRef, by adding the flier URL to the document
//       await updateDoc(doc(db, "events", docRefId), {
//           eventBanner: downloadURL,
//       }); 
//   });
// }


import { getDownloadURL, ref, uploadString } from "firebase/storage";
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

import firebase_app from "../config"
import { GoogleAuthProvider, User, createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { errorMessage } from "../error_message"

const auth = getAuth(firebase_app)

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});


export async function signUp(email: string, password: string) {
    let result = null,
        user = {} as User,
        error = null
    try {
        result = await createUserWithEmailAndPassword(auth, email, password)
        user = result.user
    } catch (e) {
        error = e
        errorMessage(e + "❌")
    }

    return { user, error }
}

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

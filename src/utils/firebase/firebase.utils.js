import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE47wOGzhBnvxj0_DRpmrxfNL0U5OtGts",
  authDomain: "crwn-clothing-db-ee934.firebaseapp.com",
  projectId: "crwn-clothing-db-ee934",
  storageBucket: "crwn-clothing-db-ee934.appspot.com",
  messagingSenderId: "1051138323053",
  appId: "1:1051138323053:web:05490f7bd9a92fda110564",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {displayName:'Wojtek'}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //id user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exist
  return userDocRef;
};

export const createAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  createUserWithEmailAndPassword(auth, email, password);
};

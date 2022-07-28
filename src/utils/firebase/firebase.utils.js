import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyA3IfPpSGCRAaTyfwHiqmD9_150PIhkLM0",
  authDomain: "crwn-clothing-db-1f3c2.firebaseapp.com",
  projectId: "crwn-clothing-db-1f3c2",
  storageBucket: "crwn-clothing-db-1f3c2.appspot.com",
  messagingSenderId: "794231424946",
  appId: "1:794231424946:web:b576f65237fdfa2e3086ab"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt:"select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
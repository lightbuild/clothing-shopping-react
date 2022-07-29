import {initializeApp} from "firebase/app";
import {getAuth,signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA3IfPpSGCRAaTyfwHiqmD9_150PIhkLM0",
  authDomain: "crwn-clothing-db-1f3c2.firebaseapp.com",
  projectId: "crwn-clothing-db-1f3c2",
  storageBucket: "crwn-clothing-db-1f3c2.appspot.com",
  messagingSenderId: "794231424946",
  appId: "1:794231424946:web:b576f65237fdfa2e3086ab"
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)
  //如果用户不存在
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
//如果用户存在
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth,email,password)
}
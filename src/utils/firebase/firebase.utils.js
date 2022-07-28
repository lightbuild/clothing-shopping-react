import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'

import {getFirestore,doc,getDoc,setDoc}from 'firebase/firestore'


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

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'users',userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  //如果用户不存在
  if(!userSnapshot.exists()){
    const {displayName,email} = userAuth;
    const createdAt = new Date()

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      })
    }catch (error){
      console.log('error creating the user',error.message)
    }
  }
//如果用户存在
  return userDocRef
}
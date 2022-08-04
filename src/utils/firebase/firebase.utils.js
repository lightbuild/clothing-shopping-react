import {initializeApp} from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query
} from 'firebase/firestore'


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

export const addCollectionAndDocument = async (collectionKey,objectsToAdd) =>{
  const colletionRef = collection(db,collectionKey)

  const batch = writeBatch(db)

  objectsToAdd.forEach((object) =>{
    const docRef = doc(colletionRef,object.title.toLowerCase())
    batch.set(docRef,object)
  })
  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async () =>{
  const colletionRef =collection(db,'categories')
  const q = query(colletionRef)

  const querySnapshot =await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
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
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

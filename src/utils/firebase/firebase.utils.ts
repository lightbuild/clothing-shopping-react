import {initializeApp} from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
  QueryDocumentSnapshot
} from 'firebase/firestore';

import {Category} from '../../store/categories/categories.types';


const firebaseConfig = {
  apiKey: 'AIzaSyA3IfPpSGCRAaTyfwHiqmD9_150PIhkLM0',
  authDomain: 'crwn-clothing-db-1f3c2.firebaseapp.com',
  projectId: 'crwn-clothing-db-1f3c2',
  storageBucket: 'crwn-clothing-db-1f3c2.appspot.com',
  messagingSenderId: '794231424946',
  appId: '1:794231424946:web:b576f65237fdfa2e3086ab'
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string
}

export const addCollectionAndDocument = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const colletionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(colletionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const colletionRef = collection(db, 'categories');
  const q = query(colletionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    docSnapshot => docSnapshot.data() as Category
  );
};

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string
}


export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //如果用户存在
  if (userSnapshot.exists()) {
    return userSnapshot as QueryDocumentSnapshot<UserData>;
  }
  //如果用户不存在
  else if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);


export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((
    resolve,
    reject
  ) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
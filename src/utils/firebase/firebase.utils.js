import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    writeBatch,
    query
} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyB1GaoYpLyiCkz39Bcrm-xzNz020-tdoaw",
    authDomain: "crwn-clothing-db-5b80d.firebaseapp.com",
    projectId: "crwn-clothing-db-5b80d",
    storageBucket: "crwn-clothing-db-5b80d.firebasestorage.app",
    messagingSenderId: "725231619832",
    appId: "1:725231619832:web:638c3ac64cdc81c0f3750d",
};
// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);


//Set up the authentication
const googleProvider = new GoogleAuthProvider();
// Obliga a seleccionar una cuenta de Google 
googleProvider.setCustomParameters({
    prompt: 'select_account',

});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
    // .reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    // return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //If user data does not exist, create /set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();


        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    //If user data exists
    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    //Si no recibo email o password, no hago nada
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    //Si no recibo email o password, no hago nada
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async () => await signOut(auth);


// Observer listeners for authentication state changes. create a listener that will be called whenever the authentication state changes (e.g., user signs in or out).
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// {
// next:callback
//error:errorCallback,
// complete:completedCallback
// }
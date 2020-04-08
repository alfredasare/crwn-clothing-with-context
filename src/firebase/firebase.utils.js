import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCEypM0daSeUW5IRQytwgtmfghH61M46fA",
  authDomain: "crwn-clothing-db-ea6e3.firebaseapp.com",
  databaseURL: "https://crwn-clothing-db-ea6e3.firebaseio.com",
  projectId: "crwn-clothing-db-ea6e3",
  storageBucket: "crwn-clothing-db-ea6e3.appspot.com",
  messagingSenderId: "659848262046",
  appId: "1:659848262046:web:93413bf0f602a4dd1c668f",
  measurementId: "G-HTRTPHH9M3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

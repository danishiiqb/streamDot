import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAvCHhtJY8fss0yh0ctHbeNuWfFq6FNJOU',
  authDomain: 'streamdot-83e98.firebaseapp.com',
  projectId: 'streamdot-83e98',
  storageBucket: 'streamdot-83e98.appspot.com',
  messagingSenderId: '903210896384',
  appId: '1:903210896384:web:dce0740c795c3850b61ce5',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const authProvider = new firebase.auth.GoogleAuthProvider();
const FieldValue = firebase.firestore.FieldValue;

export { firebaseApp, auth, firestore, authProvider, FieldValue };

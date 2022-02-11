import { createContext, useContext } from 'react';
import { firestore, FieldValue } from '../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
const dbContext = createContext('');
function useDb() {
  return useContext(dbContext);
}
function DbContextProvider({ children }) {
  const updateUerInfo = async (uid, email, name, dob = 'Null', userName) => {
    let docId = uuidv4();
    return firestore
      .collection('users')
      .doc(docId)
      .set({
        uid,
        email,
        name,
        dateCreated: Date.now(),
        connectedAcc: [
          {
            cnid: uid,
            connUid: uid,
            currWatchedMov: [],
            email,
            imgAv: `/imgs/Avatars/2gif.webp`,
            movHistry: [],
            type: 'adult',
            userName,
            watchlisthistory: [],
            mainDocId: docId,
          },
        ],
        dob,
        userName,
      });
  };
  const doesUsernameExists = (username) => {
    return firestore
      .collection('users')
      .where('userName', '==', username)
      .get()
      .then((snapshot) => {
        return snapshot.docs.length > 0;
      });
  };
  const doesUserAlreadyExist = (uid) => {
    return firestore
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((snapshot) => {
        return snapshot.docs.length > 0;
      });
  };
  const getUserfromdb = (uid) => {
    return firestore
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return { ...doc.data(), docId: doc.id };
        });
      });
  };

  const updateDocs = (docId, connData) => {
    return firestore
      .collection('users')
      .doc(docId)
      .update({
        connectedAcc: FieldValue.arrayUnion(connData),
      });
  };
  const updateUidDocs = (uid, data) => {
    return firestore
      .collection('users')
      .doc(uid)
      .update({ connectedAcc: data });
  };
  const fnVals = {
    updateUerInfo,
    doesUsernameExists,
    doesUserAlreadyExist,
    getUserfromdb,
    updateDocs,
    updateUidDocs,
  };
  return <dbContext.Provider value={fnVals}>{children}</dbContext.Provider>;
}

export { DbContextProvider, useDb };

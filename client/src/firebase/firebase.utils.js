import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBAJ0huZDTYTEaDvKEhlWrGA7m3t81Anxw",
  authDomain: "use-firebase-43193.firebaseapp.com",
  databaseURL: "https://use-firebase-43193.firebaseio.com",
  projectId: "use-firebase-43193",
  storageBucket: "use-firebase-43193.appspot.com",
  messagingSenderId: "756175991561",
  appId: "1:756175991561:web:e200230c7859789426d9d8",
  measurementId: "G-XLTW72L4LQ"
};

export const createUserProfileDocument = 
  async (userAuth, additionalData) => 
{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey, objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
}

export const getCurrentuser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe =  auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

export const saveUserCart = async (userId, cartItems) => {
  if(!userId) return {};

  const userRef = firestore.doc(`users/${userId}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    return {}
  }

  try {
    // check if cartItems exists
    const userData = await snapShot.data();
    if("cartItems" in userData){
      await userRef.update({cartItems});
    } else {
      await userRef.set({cartItems, ...userData});
    }

    
  } catch (error){
    console.log('error setting cart items', error.message);
  }

}

export const getUserCartRef = async userId => {
  const cartRef = firestore.collection('carts').where('userId', '==', userId);
  const snapshot = await cartRef.get();

  if(snapshot.empty){
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({userId, cartItems: []});
    return cartDocRef;
  } else {
    return snapshot.docs[0].ref;
  }
}

export const getUserCart = async (userAuth) => 
{
  const emptyCart = [];

  if(!userAuth) return emptyCart;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    return emptyCart
  }

  const userData = snapShot.data();

  // check if 'cartItems' map exists 
  if("cartItems" in userData){
    return userData["cartItems"];
  }

  return emptyCart;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  'prompt' : 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
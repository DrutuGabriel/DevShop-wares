import firestore from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users')
  .doc('oNS6AdvVhCpdSHVYXdil')
  .collection('cartItems')
  .doc('mwR0kNxMHkUqqf9ZEtLM');

firestore.doc('/users/oNS6AdvVhCpdSHVYXdil/cartItems/mwR0kNxMHkUqqf9ZEtLM');
firestore.collection('/users/oNS6AdvVhCpdSHVYXdil/cartItems');

//firestore.collection('carts');
// check all, where uid == newlySignedInUser
// get that doc and 

firestore.collection('carts').where('userId', '==', userId)
  .get()
  .then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      console.log(doc.id, " => ", doc.data());
    })
  })
  .catch(function(error){
    console.log("Error getting documents: ", error);
  })
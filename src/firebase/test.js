import firestore from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users')
  .doc('oNS6AdvVhCpdSHVYXdil')
  .collection('cartItems')
  .doc('mwR0kNxMHkUqqf9ZEtLM');

firestore.doc('/users/oNS6AdvVhCpdSHVYXdil/cartItems/mwR0kNxMHkUqqf9ZEtLM');
firestore.collection('/users/oNS6AdvVhCpdSHVYXdil/cartItems');


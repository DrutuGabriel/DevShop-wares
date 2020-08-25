import {all, call, takeLatest, put} from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import {
  clearCart,
  setUserCartFromDb
} from './cart.actions';

import {
  saveUserCart
} from '../../firebase/firebase.utils';
import CartActionTypes from './cart.types';
import {store} from '../store';
import {selectCartItems} from './cart.selectors';
import {selectCurrentUser} from '../user/user.selectors';


export function* clearCartOnSignOut(){
  yield put(clearCart());
}

  // TODO: set cart from database on login
export function* setUserCartFromDbOnSignIn({payload}){
    if('cartItems' in payload){
      yield put(setUserCartFromDb(payload.cartItems));
    } else {
      yield put(setUserCartFromDb([]));
    }
}

export function* updateUserCartItemsInDB(){

  const state = store.getState();
  // Get carItems
  const cartItems = selectCartItems(state)

  // Get current user id
  const user = selectCurrentUser(state);

  if(!user){
    return;
  }

  yield call(saveUserCart, user.id, cartItems);
}

export function* onSignOutSuccess(){
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess(){
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, setUserCartFromDbOnSignIn);
}

export function* onCartItemsChange(){
  yield takeLatest(CartActionTypes.ADD_ITEM, updateUserCartItemsInDB);
  yield takeLatest(CartActionTypes.REMOVE_ITEM, updateUserCartItemsInDB);
  yield takeLatest(CartActionTypes.CLEAR_CART, updateUserCartItemsInDB);
  // yield takeLatest(CartActionTypes.CLEAR_ITEM_FROM_CART, updateUserCartItemsInDB);
}

export function* cartSagas(){
  yield(all([
    call(onSignOutSuccess),
    call(onSignInSuccess),
    call(onCartItemsChange)
  ]));
}
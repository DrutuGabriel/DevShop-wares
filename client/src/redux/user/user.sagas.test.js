import {takeLatest, put, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import * as actions from './user.actions';
import * as fireUtils from '../../firebase/firebase.utils';
import * as sagas from './user.sagas';

describe('on signup success saga', () => {
  it('should trigger on SIGN_UP_SUCCESS', () => {
    const generator = sagas.onSignUpSuccess();

    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_SUCCESS, sagas.signInAfterSignUp)
    );
  });
});

describe('on signup start saga', () => {
  it('should trigger on SIGN_UP_START', () => {
    const generator = sagas.onSignUpStart();

    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_START, sagas.signUp)
    );
  });
});

describe('on signout start saga', () => {
  it('should trigger on SIGN_OUT_START', () => {
    const generator = sagas.onSignOutStart();

    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_OUT_START, sagas.signOut)
    );
  });
});

describe('on check user session saga', () => {
  it('should trigger on CHECK_USER_SESSION', () => {
    const generator = sagas.onCheckUserSession();

    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.CHECK_USER_SESSION, sagas.isUserAuthenticated)
    );
  });
});

describe('on email sign in start saga', () => {
  it('should trigger on EMAIL_SIGN_IN_START', () => {
    const generator = sagas.onEmailSignInStart();

    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, sagas.signInWithEmail)
    );
  });
});

describe('on google sign in start saga', () => {
  it('should trigger on GOOGLE_SIGN_IN_START', () => {
    const generator = sagas.onGoogleSignInStart();

    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, sagas.signInWithGoogle)
    );
  });
});

describe('on sign in after sign up saga', () => {
  it('should fire getSnapshotFromUserAuth', () => {
    const mockUser = {};
    const mocKAdditionalData = {};
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mocKAdditionalData
      }
    };

    const generator = sagas.signInAfterSignUp(mockAction);
    expect(generator.next().value).toEqual(
      sagas.getSnapshotFromUserAuth(mockUser, mocKAdditionalData)
    );
  });
});

describe('on sign up saga', () => {
  const mockEmail = 'test@gmail';
  const mockPassword = 'test123';
  const mockDisplayName = 'test';

  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName
    }
  };

  const generator = sagas.signUp(mockAction);

  it('should call auth.createUserWithEmailAndPassword', () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      fireUtils.auth,
      'createUserWithEmailAndPassword'
    );

    generator.next();

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe('on sign out saga', () => {
  const generator = sagas.signOut();

  it('should call auth.signOut', () => {
    const expectSignOut = jest.spyOn(fireUtils.auth, 'signOut');
    generator.next();
    expect(expectSignOut).toHaveBeenCalled();
  });

  it('should call signOutSuccess', () => {
    expect(generator.next().value).toEqual(
      put(actions.signOutSuccess())
    );
  });

  it('should call signOutFailure on error', () => {
    const newGenerator = sagas.signOut();
    newGenerator.next();
    expect(generator.throw('error').value).toEqual(
      put(actions.signOutFailure('error'))
    );
  }); 
});

describe('is user authenticated saga', () => {
  const generator = sagas.isUserAuthenticated();

  it('should call getCurrentUser', () => {
    expect(generator.next().value).toEqual(
      fireUtils.getCurrentuser()
    );
  });

  it('should call getSnapshotFromUserAuth if userAuth exists', () => {
      const mockUserAuth =  {uid: '123da'};

      expect(generator.next(mockUserAuth).value).toEqual(
        sagas.getSnapshotFromUserAuth(mockUserAuth)
      );
  });

  it('should call signInFailure on error', () => {
    const newGenerator = sagas.isUserAuthenticated();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(actions.signInFailure('error'))
    );
  });
});

describe('get snapshot from userAuth', () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};
  const generator = sagas.getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);

  expect(generator.next().value).toEqual(
    call(
      fireUtils.createUserProfileDocument, 
      mockUserAuth, 
      mockAdditionalData
    )
  );
});
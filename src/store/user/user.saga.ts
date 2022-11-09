import {takeLatest, put, all, call} from 'typed-redux-saga/macro';
import {User} from 'firebase/auth';


import {USER_ACTION_TYPE} from './user.types';

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from './user.action';

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation
} from '../../utils/firebase/firebase.utils';


//用户注册，登录，保持在线
export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

//验证用户是否登录
export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
    //直接put success不就好了？
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

//使用谷歌账号登录
export function* signInWithGoogle() {
  try {
    const {user} = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

//使用邮箱登录
export function* signInWithEmail({payload: {email, password}}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const {user} = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

//注册账号
export function* signUp({payload: {email, password, displayName}}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCredential) {
      const {user} = userCredential;
      yield* put(signUpSuccess(user, {displayName}));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

//登出账号
export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

//注册之后应该有登录的动作
export function* signInAfterSignUp({payload: {user, additionalDetails}} :SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}


export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

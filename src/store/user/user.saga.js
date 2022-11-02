import {takeLatest,put,all,call} from 'redux-saga/effects'

import {USER_ACTION_TYPE} from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
} from "./user.action";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from "../../utils/firebase/firebase.utils";


//用户注册，登录，保持在线
export function* getSnapshotFromUserAuth(userAuth,additionalDetails){
  try{
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({id:userSnapshot.id,...userSnapshot.data()}))
  } catch (error){
    yield put(signInFailed(error))
  }
}

//验证用户是否登录
export function* isUserAuthenticated(){
  try {
    const userAuth= yield call(getCurrentUser)
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth,userAuth)
    //直接put success不就好了？
  } catch (error){
    yield put(signInFailed(error))
  }
}

//使用谷歌帐号登录
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

//使用邮箱登录
export function* signInWithEmail({payload:{email,password}}){
  try{
    const {user} = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth,user)
  } catch(error){
    yield put(signInFailed(error))
  }
}

//注册帐号
export function* signUp({payload:{email,password,displayName}}){
  try{
    const {user} =yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user,{displayName}))
  }catch (error){
    yield put(signUpFailed(error))
  }
}

//登出账号
export function* signOut(){
  try{
    yield call(signOutUser);
    yield put(signOutSuccess())
  }catch (error){
    yield put(signOutFailed(error))
  }
}

//注册之后应该有登录的动作
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}


export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession(){
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

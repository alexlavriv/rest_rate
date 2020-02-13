import {LoginRegisterConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import LoginRegisterActions from './actions'
import {all} from 'redux-saga/effects'

function* register(action){
  console.log('Register=', action);
  try {

    const res = yield call(fetch, action.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(LoginRegisterActions.registerSuccessAction(json));
  } catch (e) {
    yield put(LoginRegisterActions.registerFailureAction(e.message));
  }
}

function* login(action){
  console.log('Login=', action);
  try {
    const res = yield call(fetch, action.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    });
    const json = yield call([res, 'json']);
    yield put(LoginRegisterActions.loginSuccessAction(json));
  } catch (e) {
    yield put(LoginRegisterActions.loginFailureAction(e.message));
  }
}

function* logout(action){
  console.log('Login=', action);
  try {
    const res = yield call(fetch, action.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    });

    yield call([res, 'json']);
    yield put(LoginRegisterActions.logoutSuccessAction());
  } catch (e) {
 
    yield put(LoginRegisterActions.logoutFailureAction(e.message));
  }
}

function* LoginRegisterSaga() {
    yield all([
        takeEvery(LoginRegisterConstants.REGISTER, register),
        takeEvery(LoginRegisterConstants.LOGIN, login),
        takeEvery(LoginRegisterConstants.LOGOUT, logout)
    ]);
}


export default LoginRegisterSaga;

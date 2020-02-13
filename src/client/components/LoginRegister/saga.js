import {LoginRegisterConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import LoginRegisterActions from './actions'

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
    yield put(LoginRegisterActions.registerSuccesAction(json));
  } catch (e) {
    yield put(LoginRegisterActions.registerFailureAction(e.message));
  }
}

function* LoginRegisterSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(LoginRegisterConstants.REGISTER, register);
}

export default LoginRegisterSaga;

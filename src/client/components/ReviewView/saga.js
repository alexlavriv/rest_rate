import {ReviewViewConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {gotUserFailure, gotUserSuccess} from './actions'
import {all} from 'redux-saga/effects'
import {LoginRegisterActions} from "../LoginRegister/actions";

function* getProfile(action){
  console.log("get profile saga");
  try {
    const res = yield call(fetch, action.uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = yield call([res, 'json']); //retrieve body of response
    console.log("got user success");
    yield put(gotUserSuccess(json));
  } catch (e) {
    yield put(gotUserFailure(e.message));
  }
}

// function* validateUsername(action) {
//   try {
//     const res = yield call(fetch, action.uri, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
//     const json = yield call([res, 'json']);
//     yield put(LoginRegisterActions.usernameAvailable(json));
//   } catch (e) {
//
//   }
// }


function* ReviewViewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ReviewViewConstants.SHOW_PROFILE, getProfile);
}

export default ReviewViewSaga;
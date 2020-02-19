import {ReviewListConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {GetReviewsFailureAction, GetReviewsSuccessAction} from './actions'
import {all} from 'redux-saga/effects'

function* getReviews(action){
  try {

    const res = yield call(fetch, action.uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(GetReviewsSuccessAction(json));
  } catch (e) {
    yield put(GetReviewsFailureAction(e.message));
  }
}


function* GetReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ReviewListConstants.GET_REVIEWS, getReviews);
}

export default GetReviewsSaga;
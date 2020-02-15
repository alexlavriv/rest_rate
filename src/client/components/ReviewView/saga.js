import {ReviewViewConstatns} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {addReviewSuccessAction, addReviewFailAction} from './actions'
import {all} from 'redux-saga/effects'

function* getReviews(action){
  console.log('addReview=', action);
  try {

    const res = yield call(fetch, action.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(addReviewSuccessAction(json));
  } catch (e) {
    yield put(addReviewFailAction(e.message));
  }
}


function* getReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AddReviewActionsConstants.ADD_REVIEW, addReview);
}

export default getReviewsSaga;
import {ReviewListConstants, SearchBarConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {ReviewListActions, SearchBarActions} from './actions'
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
    yield put(ReviewListActions.GetReviewsSuccessAction(json));
  } catch (e) {
    yield put(ReviewListActions.GetReviewsFailureAction(e.message));
  }
}

function* getRestNames(action){
  try {
    console.log("GET REST NAMES", action)
    const res = yield call(fetch, action.uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(SearchBarActions.GetRestNamesSuccessAction(json));
  } catch (e) {
    yield put(SearchBarActions.GetRestNamesFailureAction(e.message));
  }
}

function* getQuery(action){
  console.log("!!!!!!!!!!!!!getQuery",action)
  const body = JSON.stringify(action.payload);
  try {
    const res = yield call(fetch, action.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body
      
    });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(SearchBarActions.GetQuerySuccessAction(json));
  } catch (e) {
    yield put(SearchBarActions.GetQueryFailureAction(e.message));
  }
}



function* GetReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield all ([
              takeEvery(ReviewListConstants.GET_REVIEWS, getReviews), 
              takeEvery(SearchBarConstants.GET_REST_NAMES, getRestNames), 
              takeEvery(SearchBarConstants.GET_QUERY, getQuery)
    ]);
          }
          

export default GetReviewsSaga;
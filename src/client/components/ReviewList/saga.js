import {ReviewListConstants, ReviewViewConstants, SearchBarConstants} from './constants'
import {all, call, put, takeEvery} from 'redux-saga/effects'
import {DeleteReviewFailure, ReviewEditFailAction, ReviewListActions, SearchBarActions} from './actions'

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
    console.log("GET REST NAMES", action);
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
  console.log("!!!!!!!!!!!!!getQuery",action);
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

// function* getProfile(action){
//   console.log("get profile saga");
//   try {
//     const res = yield call(fetch, action.uri, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
//     const json = yield call([res, 'json']); //retrieve body of response
//     console.log("got user success");
//     yield put(ShowProfileSuccessAction(json));
//   } catch (e) {
//     yield put(ShowProfileFailureAction(e.message));
//   }
// }

function* deleteReview(action) {
  console.log("delete review saga");
  try {
    const res = yield call(fetch, action.uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log ('after call');
    const json = yield call([res, 'json']);
    console.log('delete review success for id:', json);
    yield put(ReviewListActions.GetReviewsSuccessAction(json))
  } catch (e) {
    yield put(DeleteReviewFailure(e.message));
  }

}

function* editReview(action) {
  console.log('edit review saga', action.payload);
  try {
    const res = yield call(fetch, action.uri, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(action.payload)
    });
    const json = yield call ([res, 'json']);
    yield put(ReviewListActions.GetReviewsSuccessAction(json));
  } catch (e) {
    yield put(ReviewEditFailAction(e));
  }
}

function* GetReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield all ([
              takeEvery(ReviewListConstants.GET_REVIEWS, getReviews), 
              takeEvery(SearchBarConstants.GET_REST_NAMES, getRestNames), 
              takeEvery(SearchBarConstants.GET_QUERY, getQuery),
              // takeEvery(ReviewViewConstants.SHOW_PROFILE, getProfile),
              takeEvery(ReviewViewConstants.DELETE, deleteReview),
              takeEvery(ReviewViewConstants.EDIT_REVIEW, editReview),
    ]);
          }
          

export default GetReviewsSaga;
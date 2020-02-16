import {AddReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {addReviewSuccessAction, addReviewFailAction} from './actions'
import {all} from 'redux-saga/effects'

function* addReview(action){
  console.log('addReview=', action);
  try {
    var fd = new FormData()
    Object.keys(action.payload).forEach(function(key,index) {
      if (key!='files')
     { fd.append(key, action.payload[key])}
     else{
       var files = []
       for (const file of action.payload[key]){
        fd.append('files', file);
        
       
       }
    
       
     }
  });
    const res = yield call(fetch, action.uri, {
      method: 'POST',
      body: fd
    });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(addReviewSuccessAction(json));
  } catch (e) {
    yield put(addReviewFailAction(e.message));
  }
}




function* addReviewSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AddReviewActionsConstants.ADD_REVIEW, addReview);
}

export default addReviewSaga;
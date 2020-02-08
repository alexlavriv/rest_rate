import {GalleryActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import GalleryActions from './actions'

function* loadImages(action){
  console.log('GallerySaga=', action);
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      });

    const json = yield call([res, 'json']); //retrieve body of response
    yield put(GalleryActions.loadImagesSuccessAction(json));
  } catch (e) {
    yield put(GalleryActions.loadImagesFailureAction(e.message));
  }
}

function* GallerySaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(GalleryActionsConstants.LOAD_IMAGES_ACTION, loadImages);
}

export default GallerySaga;

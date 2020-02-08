import {AppActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AppActions from './actions'

function* loadTags(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.loadTagsSuccessAction(json));
    } catch (e) {
        yield put(AppActions.loadTagsFailureAction(e.message));
    }
}

function* AppSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppActionsConstants.LOAD_TAGS, loadTags);
}

export default AppSaga;

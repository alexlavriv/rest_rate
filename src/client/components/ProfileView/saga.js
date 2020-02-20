import {ProfileViewConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {ProfileViewActions} from './actions'
import {all} from 'redux-saga/effects'

// function* register(action){
//     try {
//         let fd = new FormData();
//         Object.keys(action.payload).forEach(function(key,index) {
//             fd.append(key, action.payload[key])
//         });
//
//         const res = yield call(fetch, action.uri, {
//             method: 'POST',
//             body: fd
//         });
//         console.log("register fd:", fd);
//         const json = yield call([res, 'json']); //retrieve body of response
//         yield put(LoginRegisterActions.registerSuccessAction(json));
//     } catch (e) {
//         yield put(LoginRegisterActions.registerFailureAction(e.message));
//     }
// }

// function* login(action){
//     try {
//         const res = yield call(fetch, action.uri, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(action.payload)
//         });
//         const json = yield call([res, 'json']);
//         yield put(LoginRegisterActions.loginSuccessAction(json));
//     } catch (e) {
//         yield put(LoginRegisterActions.loginFailureAction(e.message));
//     }
// }


function* ProfileViewSaga() {
    yield all([
        // takeEvery(LoginRegisterConstants.REGISTER, register),
    ]);
}


export default ProfileViewSaga;

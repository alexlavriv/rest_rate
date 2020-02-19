import {LoginRegisterConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {LoginRegisterActions, EditUserActions} from './actions'
import {all} from 'redux-saga/effects'

function* register(action){
    try {
        let fd = new FormData();
        Object.keys(action.payload).forEach(function(key,index) {
            fd.append(key, action.payload[key])
        });

        const res = yield call(fetch, action.uri, {
            method: 'POST',
            body: fd
        });
        console.log("register fd:", fd);
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(LoginRegisterActions.registerSuccessAction(json));
    } catch (e) {
        yield put(LoginRegisterActions.registerFailureAction(e.message));
    }
}

function* login(action){
    try {
        const res = yield call(fetch, action.uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        });
        const json = yield call([res, 'json']);
        yield put(LoginRegisterActions.loginSuccessAction(json));
    } catch (e) {
        yield put(LoginRegisterActions.loginFailureAction(e.message));
    }
}

function* logout(action){
    const body = JSON.stringify({'token': action.payload});
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body
    };
    try {
        const res = yield call(fetch, action.uri, req);

        yield call([res, 'json']);
        yield put(LoginRegisterActions.logoutSuccessAction());
    } catch (e) {

        yield put(LoginRegisterActions.logoutFailureAction(e.message));
    }
}

function* validateUsername(action) {
    try {
        const res = yield call(fetch, action.uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = yield call([res, 'json']);
        yield put(LoginRegisterActions.usernameAvailable(json));
    } catch (e) {

    }
}

function* edit(action) {
    console.log("edit", action.payload);
    try {

        const res = yield call(fetch, action.uri, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(action.payload)
        });
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(EditUserActions.EditSuccessAction(json));
    } catch (e) {
        yield put(EditUserActions.EditFailureAction(e.message));
    }
    console.log("edit out");
}

function* LoginRegisterSaga() {
    yield all([
        takeEvery(LoginRegisterConstants.REGISTER, register),
        takeEvery(LoginRegisterConstants.LOGIN, login),
        takeEvery(LoginRegisterConstants.LOGOUT, logout),
        takeEvery(LoginRegisterConstants.VALIDATE_USERNAME, validateUsername),
        takeEvery(LoginRegisterConstants.EDIT, edit)
    ]);
}


export default LoginRegisterSaga;

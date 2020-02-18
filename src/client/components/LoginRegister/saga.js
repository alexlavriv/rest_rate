import {LoginRegisterConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import {LoginRegisterActions} from './actions'
import {all} from 'redux-saga/effects'

function* register(action){
    console.log('Register=', action);
    try {
        let fd = new FormData();
        Object.keys(action.payload).forEach(function(key,index) {
            fd.append(key, action.payload[key])
        });

        const res = yield call(fetch, action.uri, {
            method: 'POST',
            body: fd
        });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(LoginRegisterActions.registerSuccessAction(json));
    } catch (e) {
        yield put(LoginRegisterActions.registerFailureAction(e.message));
    }
}

function* login(action){
    console.log('Login=', action);
    try {
        const res = yield call(fetch, action.uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        });
        console.log("LOGINLOGN");
        const json = yield call([res, 'json']);
        yield put(LoginRegisterActions.loginSuccessAction(json));
    } catch (e) {
        yield put(LoginRegisterActions.loginFailureAction(e.message));
    }
    console.log('out of LOGIN');
}

function* logout(action){
    console.log('Logout=', action.payload);
    const body = JSON.stringify({'token': action.payload})
    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body
    };
    console.log(req);
    try {
        const res = yield call(fetch, action.uri, req);

        yield call([res, 'json']);
        yield put(LoginRegisterActions.logoutSuccessAction());
    } catch (e) {

        yield put(LoginRegisterActions.logoutFailureAction(e.message));
    }
}

function* validateUsername(action) {
    console.log('validate = ', action);
    try {
        const res = yield call(fetch, action.uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('validate, res =', res);
        const json = yield call([res, 'json']);
        console.log('json:', json);
        yield put(LoginRegisterActions.usernameAvailable(json));
    } catch (e) {
        console.log("some error", e);

    }
    console.log('out of validate')
}

function* LoginRegisterSaga() {
    yield all([
        takeEvery(LoginRegisterConstants.REGISTER, register),
        takeEvery(LoginRegisterConstants.LOGIN, login),
        takeEvery(LoginRegisterConstants.LOGOUT, logout),
        takeEvery(LoginRegisterConstants.VALIDATE_USERNAME, validateUsername)
    ]);
}


export default LoginRegisterSaga;

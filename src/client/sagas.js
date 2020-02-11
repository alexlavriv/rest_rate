import { all } from 'redux-saga/effects'
import GallerySaga from './components/Gallery/saga'
import LoginRegisterSaga from './components/LoginRegister/saga'
import AppSaga from './components/App/saga'

export default function* Sagas() {
    yield all([
        AppSaga(),
        GallerySaga(),
        LoginRegisterSaga()
    ])
}

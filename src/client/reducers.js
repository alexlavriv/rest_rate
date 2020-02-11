import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import LoginRegisterReducer from './components/LoginRegister/reducer'

export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  login_register: LoginRegisterReducer
});

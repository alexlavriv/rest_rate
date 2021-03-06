import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import LoginRegisterReducer from './components/LoginRegister/reducer'
import AddReviewReducer from './components/AddReview/reducer';
import ReviewListReducer from './components/ReviewList/reducer'

export default combineReducers({
  app: AppReducer,
  gallery: GalleryReducer,
  login_register: LoginRegisterReducer,
  add_review: AddReviewReducer,
  review_list: ReviewListReducer,
});

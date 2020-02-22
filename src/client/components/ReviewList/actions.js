import {ReviewListConstants, SearchBarConstants, ProfileViewConstants, ReviewViewConstants, AdvancedSearchConstants} from './constants.js';
import {EditReviewConstants} from "./constants";

 const GetReviewsAction = () =>{
    return{
        type:ReviewListConstants.GET_REVIEWS,
        uri:'http://localhost:8000/all_reviews',
        payload: {}
    };
};

 const GetReviewsSuccessAction = (reviews) =>{
  return{
      type:ReviewListConstants.GET_REVIEWS_SUCCESS,
      payload: reviews
  };
};

 const GetReviewsFailureAction = (message) =>{
  return{
      type:ReviewListConstants.GET_REVIEWS_FAIL,
      payload: message
  };
};


const GetRestNamesAction = () =>{
  return{
      type:SearchBarConstants.GET_REST_NAMES,
      uri:'http://localhost:8000/restaurant_all_names',
      payload: {}
  };
};

const GetRestNamesSuccessAction = (names) =>{
  return{
      type:SearchBarConstants.GET_REST_NAMES_SUCCESS,
      payload: names
  };
};

const GetRestNamesFailureAction = (message) =>{
  return{
      type:ReviewListConstants.GetRestNamesFailureAction,
      payload: message
  };
};


const GetQueryAction = (query) =>{
    var caseInsesativeQuery = {};
    Object.keys(query).forEach(function(key,index) {
        let value = query[key];
        if ((typeof value) !== "string"){
            caseInsesativeQuery[key] = value;
        }
        else{
            caseInsesativeQuery[key] = {'$regex':`^${value}$`, '$options':'i'}
        }
    });
  return{
      type:SearchBarConstants.GET_QUERY,
      uri:'http://localhost:8000/query_review',
      payload: caseInsesativeQuery
  };
};

const GetQuerySuccessAction = (result) =>{
  console.log("GetQuerySuccessAction", result);
  return{
      type:SearchBarConstants.GET_QUERY_SUCCESS,
      payload: result.reviews
  };
};

const GetQueryFailureAction = (message) =>{
  console.log("GetQueryFailureAction", message);
  return{
      type:ReviewListConstants.GET_QUERY_FAIL,
      payload: message
  };
};

export const ShowProfileAction = (userName) =>{
    console.log("show profile action");
    return({
        type:ReviewViewConstants.SHOW_PROFILE,
        uri: 'http://localhost:8080/users/' + userName,
    });
};

export const gotUserSuccess = (user) => {
    console.log("got user success action, user:", user);
    return{
        type:ReviewViewConstants.GOT_USER,
        payload: user
    }
};

export const gotUserFailure = (err) => {
    return{
        type:ReviewViewConstants.GOT_USER_FAIL,
        payload: {err}
    }
};

export const DeleteReviewAction = (review_id) => {
    console.log('delete action, id:', review_id);
    return{
        type: ReviewViewConstants.DELETE,
        uri: 'http://localhost:8080/review/delete/' + review_id,
    }
};

export const DeleteReviewSuccess = (id) => {
    return{
        type: ReviewViewConstants.DELETE_SUCCESS,
        payload: id
    }
};

export const DeleteReviewFailure = () => {
    return{
        type: ReviewViewConstants.DELETE_FAILURE
    }
};

export const SetEditWindowAction = (review) => {
    return{
        type: ReviewViewConstants.SET_EDIT_WINDOW,
        payload: review
    }
};

export const ResetEditWindowAction = () => {
    return{
        type: ReviewViewConstants.RESET_EDIT_WINDOW,
    }
};

export const EditReviewFormChangeAction = (id, value) => {
    return {
        type: EditReviewConstants.EDIT_REVIEW_FORM_CHANGE,
        payload: {
            id,
            value
        }
    }
};

export const EditReviewAction = (review) => {

    console.log('edit review action', review);

    return{
        type: ReviewViewConstants.EDIT_REVIEW,
        uri: 'http://localhost:8080/review/edit',
        payload: review
    }
};

export const ReviewEditFailAction = (error) => {
    return{
        type: ReviewViewConstants.EDIT_FAILURE
    }
};

const clearShowProfile = () => {
    return{
        type:ProfileViewConstants.CLOSE,
    }
};

const showAdvancedSearchAction = (show) => {
    return {
        type:AdvancedSearchConstants.SHOW_ADVANCED_SEARCH,
        payload: show
    }
};

const changeAdvancedSearchAction = (id, value)=>{
    return {
        type:AdvancedSearchConstants.ADVANCED_SEARCH_FORM_CHANGE,
        payload: {id, value}
    }
};




const ProfileViewActions = {clearShowProfile};
const ReviewListActions = {GetReviewsAction, GetReviewsSuccessAction, GetReviewsFailureAction};
const SearchBarActions = {GetRestNamesAction, GetRestNamesSuccessAction, GetRestNamesFailureAction,
                          GetQueryAction, GetQuerySuccessAction, GetQueryFailureAction};

const AdvancedSearchActions = {showAdvancedSearchAction, changeAdvancedSearchAction};

export {ReviewListActions, SearchBarActions, ProfileViewActions, AdvancedSearchActions}


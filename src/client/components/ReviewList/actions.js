import {ReviewListConstants, SearchBarConstants, ProfileViewConstants, ReviewViewConstants, AdvancedSearchConstants} from './constants.js';

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

  return{
      type:SearchBarConstants.GET_QUERY,
      uri:'http://localhost:8000/query_review',
      payload: query
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

export const OpenMenuAction = (review_id, target) => {
    console.log('open menu action, id:', review_id);
    console.log('open menu action, target:', target);

    return({
        type:ReviewViewConstants.OPEN_MENU,
        payload: {review_id, target}
    });
};
export const CloseMenuAction = () => {
    return({
        type:ReviewViewConstants.CLOSE_MENU,
    });
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
}

const ProfileViewActions = {clearShowProfile};
const ReviewListActions = {GetReviewsAction, GetReviewsSuccessAction, GetReviewsFailureAction};
const SearchBarActions = {GetRestNamesAction, GetRestNamesSuccessAction, GetRestNamesFailureAction,
                          GetQueryAction, GetQuerySuccessAction, GetQueryFailureAction};

const AdvancedSearchActions = {showAdvancedSearchAction}

export {ReviewListActions, SearchBarActions, ProfileViewActions, AdvancedSearchActions}


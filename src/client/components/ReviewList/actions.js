import {ReviewListConstants,SearchBarConstants} from './constants.js';

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
  console.log("GetQuerySuccessAction", result)
  return{
      type:SearchBarConstants.GET_QUERY_SUCCESS,
      payload: result.reviews
  };
};

const GetQueryFailureAction = (message) =>{
  console.log("GetQueryFailureAction", message)
  return{
      type:ReviewListConstants.GET_QUERY_FAIL,
      payload: message
  };
};



const ReviewListActions = {GetReviewsAction, GetReviewsSuccessAction, GetReviewsFailureAction}
const SearchBarActions = {GetRestNamesAction, GetRestNamesSuccessAction, GetRestNamesFailureAction,
                          GetQueryAction, GetQuerySuccessAction, GetQueryFailureAction}

export {ReviewListActions, SearchBarActions}
import {ReviewListConstants} from './constants.js';

export const GetReviewsAction = () =>{
    return{
        type:ReviewListConstants.GET_REVIEWS,
        uri:'http://localhost:8000/all_reviews',
        payload: {}
    };
};

export const GetReviewsSuccessAction = (reviews) =>{
  console.log("GOT REVIEWS:\n" + reviews["bathroom_rating"]);
  return{
      type:ReviewListConstants.GET_REVIEWS_SUCCESS,
      payload: reviews
  };
};

export const GetReviewsFailureAction = (message) =>{
  return{
      type:ReviewListConstants.GET_REVIEWS_FAIL,
      payload: message
  };
};

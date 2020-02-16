import {ReviewViewConstatns} from './constants.js';

export const GetReviewsAction = () =>{
    return{
        type:ReviewViewConstatns.GET_REVIEWS,
        payload: {}
    };
};

export const GetReviewsSuccessAction = (reviews) =>{
  return{
      type:ReviewViewConstatns.GET_REVIEWS,
      payload: reviews
  };
};

export const GetReviewsFailureAction = (message) =>{
  return{
      type:ReviewViewConstatns.GET_REVIEWS,
      payload: {message}
  };
};

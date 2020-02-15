import { ReviewListConstants} from './constants.js';

export const GetRewiewsAction = () =>{
    return{
        type:ReviewListConstants.GET_REVIEWS,
        uri:'http://localhost:8000/all_reviews',
        payload: {}
    };
};

export const GetReviewsSuccessAction = (reviews) =>{
  console.log(reviews)
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

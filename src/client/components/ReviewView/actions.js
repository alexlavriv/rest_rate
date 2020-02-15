import { ReviewViewConstatns} from './constants.js';

export const GetRewiewsAction = () =>{
    return{
        type:ReviewViewConstatns.GET_REVIEWS,
        payload: {}
    };
};

export const GetRewiewsSuccessAction = (reviews) =>{
  return{
      type:ReviewViewConstatns.GET_REVIEWS,
      payload: reviews
  };
};

export const GetRewiewsFailureAction = (message) =>{
  return{
      type:ReviewViewConstatns.GET_REVIEWS,
      payload: {message}
  };
};

import {ReviewListConstants, SearchBarConstants} from './constants'

import initialState from '../../initialState'


const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

const ReviewListReducer = (state = initialState.review_list, action) => {
 
    switch (action.type){
        case SearchBarConstants.GET_REST_NAMES_SUCCESS:
            console.log("GET_REST_NAMES_SUCCESS", action)
            return state = state.set('rest_names', action.payload.names);
        case ReviewListConstants.ADD_REVIEW_SUCCESS:
        case ReviewListConstants.GET_REVIEWS_SUCCESS:
            const updated_names = action.payload.review_list.map(review => toTitleCase(review.rest_name));
            const names = state.get('rest_names');
            const join = [...names, ...updated_names];
            const unique_names  = [...new Set(join)]
             state = state.set('rest_names', unique_names);

            return state = state.set('reviews', action.payload.review_list);
        
        default: //otherwise state is lost!
        return state;
    }
};

export default ReviewListReducer;

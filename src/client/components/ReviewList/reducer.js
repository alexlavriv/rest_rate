import {ReviewListConstants, SearchBarConstants} from './constants'

import initialState from '../../initialState'
const ReviewListReducer = (state = initialState.review_list, action) => {
 
    switch (action.type){
        case SearchBarConstants.GET_REST_NAMES_SUCCESS:
            console.log("GET_REST_NAMES_SUCCESS", action)
            return state = state.set('rest_names', action.payload.names);
        case ReviewListConstants.ADD_REVIEW_SUCCESS:
        case ReviewListConstants.GET_REVIEWS_SUCCESS:
            return state = state.set('reviews', action.payload.review_list);
        
        default: //otherwise state is lost!
        return state;
    }
};

export default ReviewListReducer;

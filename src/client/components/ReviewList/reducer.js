import {ReviewListConstants} from './constants'

import initialState from '../../initialState'
const ReviewListReducer = (state = initialState.review_list, action) => {
 
    switch (action.type){
        case ReviewListConstants.ADD_REVIEW_SUCCESS:
        case ReviewListConstants.GET_REVIEWS_SUCCESS:
            state = state.set('reviews', action.payload.review_list);
        
        default: //otherwise state is lost!
        return state;
    }
};

export default ReviewListReducer;

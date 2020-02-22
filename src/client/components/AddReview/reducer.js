import {AddReviewActionsConstants} from './constants'
import initialState from '../../initialState'

const AddReviewReducer = (state = initialState.add_review, action) => {
    switch (action.type){
        case AddReviewActionsConstants.SHOW_WINDOW:
        {
            return state = state.set('show', action.payload.is_open);
        }
        case AddReviewActionsConstants.ADD_REVIEW_SUCCESS:
        {
            return  state = state.set('show', false);
        }
        case AddReviewActionsConstants.REST_REVIEW_FORM_CHANGE:
        {
            let review = state.get('review');
            review[action.payload.id] = action.payload.value;
            return state = state.set('review', review);
        }
        case AddReviewActionsConstants.REST_REVIEW_FILE_CHANGE:
        {
            let review = state.get('review');
            review['files'] = action.payload;
            return state = state.set('review', review);
        }

        default: //otherwise state is lost!
        return state;
    }
};

export default AddReviewReducer;

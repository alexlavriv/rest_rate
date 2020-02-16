import {AddReviewActionsConstants} from './constants'
import initialState from '../../initialState'

const AddReviewReducer = (state = initialState.add_review, action) => {
    console.log("In LoginRegisterReducer", action);
    switch (action.type){
        case AddReviewActionsConstants.SHOW_WINDOW:
            return state = state.set('show', action.payload.is_open);
        case AddReviewActionsConstants.ADD_REVIEW_SUCCESS:
                console.log("In ADD_REVIEW_SUCCESS "+ state);
              return  state = state.set('show', false);
        case AddReviewActionsConstants.REST_REVIEW_FORM_CHANGE:
            console.log(state);
            let review = state.get('review');
            review[action.payload.id] = action.payload.value;
            return state = state.set('user', review);
        default: //otherwise state is lost!
        return state;
    }
};

export default AddReviewReducer;

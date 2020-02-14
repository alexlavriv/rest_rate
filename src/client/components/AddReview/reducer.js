import {AddReviewActionsConstants} from './constants'
import initialState from '../../initialState'
const AddReviewReducer = (state = initialState.add_review, action) => {
    console.log("In LoginRegisterReducer", action);
    switch (action.type){
        case AddReviewActionsConstants.SHOW_WINDOW:
            state = state.set('show', action.payload.is_open);
        default: //otherwise state is lost!
        return state;
    }
};

export default AddReviewReducer;

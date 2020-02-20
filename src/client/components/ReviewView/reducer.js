import {ReviewViewConstants} from './constants'
import initialState from '../../initialState'
const ReviewViewReducer = (state = initialState.profile_view, action) => {
    switch (action.type){
        case ReviewViewConstants.GOT_USER:
        {
            console.log("got user reducer", state);
            state = state.set('user', action.payload);
            state = state.set('show', true);
            console.log(state);
            return state;
        }
        case ReviewViewConstants.GOT_USER_FAIL:
        {
            state = state.set('user', {});
            state = state.set('show', false);
            return state;
        }
        default: //otherwise state is lost!
            return state;
    }
};

export default ReviewViewReducer;

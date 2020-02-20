import {ProfileViewConstants} from './constants'
import initialState from '../../initialState'
const ProfileViewReducer = (state = initialState.profile_view, action) => {
    switch (action.type){
        case ProfileViewConstants.CLOSE:
        {
            state = state.set('show', false);
            state = state.set('user', {});
            return state;
        }
        default: //otherwise state is lost!
            return state;
    }
};

export default ProfileViewReducer;

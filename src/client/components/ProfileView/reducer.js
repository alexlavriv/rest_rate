import {ProfileViewConstants} from './constants'
import initialState from '../../initialState'
import {ReviewViewConstants} from '../ReviewView/constants'
const ProfileViewReducer = (state = initialState.profile_view, action) => {
    switch (action.type){
        case ProfileViewConstants.CLOSE:
        {
            state = state.set('show', false);
            state = state.set('user', {});
            return state;
        }

        case ReviewViewConstants.GOT_USER:
            {
                console.log("got user reducer", state);
                state = state.set('user', action.payload);
                state = state.set('show', true);
                console.log(state);
                return state;
            }
        default: //otherwise state is lost!
            return state;


    }

};

export default ProfileViewReducer;

import {LoginRegisterConstants} from './constants'
import initialState from '../../initialState'
const LoginRegisterReducer = (state = initialState.register_login, action) => {
    console.log("In LoginRegisterReducer", action)
    switch (action.type){
        case LoginRegisterConstants.OPEN_WINDOW:
                console.log("Changing state to ", action.payload)
          state = state.set('isOpenned', action.payload);
          return state;
        case LoginRegisterConstants.FIELD_UPDATE:
            var user = {}
            if (state.has('user')){
                user = state.get('user')
            }
            user[action.payload.id] = action.payload.value
            state = state.set('user', user);
        default: //otherwise state is lost!
        return state;
    }
}

export default LoginRegisterReducer;

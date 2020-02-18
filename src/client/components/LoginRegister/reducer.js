import {LoginRegisterConstants} from './constants'
import initialState from '../../initialState'
const LoginRegisterReducer = (state = initialState.register_login, action) => {
    console.log("In LoginRegisterReducer", action);
    switch (action.type){
        case LoginRegisterConstants.OPEN_WINDOW:
            {console.log("Changing state to ", action.payload);
            state = state.set('isOpened', action.payload);
            return state;}
        case LoginRegisterConstants.USERNAME_AVAILABLE:
            console.log("changing username availability");
            state = state.set('available', action.payload.available);
            console.log(state);
            return state;
        case LoginRegisterConstants.FIELD_UPDATE:
            console.log("field update");
            {let user = (state.has('user')) ? state.get('user'):{};
            user[action.payload.id] = action.payload.value;
            state = state.set('user', user);
            return state;}
        case LoginRegisterConstants.REGISTER_SUCCESS:
            {console.log("in register\\login success");
            console.log(action.payload);
            state = state.set('user', action.payload.user);
            state = state.set('token', action.payload.token);
            state = state.set('isOpened', {isLogin:false, isRegister:false});
            return state;}
        case LoginRegisterConstants.LOGIN_SUCCESS:
            {
            if (!action.payload.token){
                state = state.set('login_error', true);
            }
            else
          {  state = state.set('user', action.payload.user);
            state = state.set('token', action.payload.token);
            state = state.set('isOpened', {isLogin:false, isRegister:false});}
            return state;}
        case LoginRegisterConstants.LOGOUT_SUCCESS:
            {state = state.set('token', "");
            state = state.set('user', {});
            state = state.set('isOpened', {isLogin:false, isRegister:false});
            return state;}
        case LoginRegisterConstants.FILE_CHANGE:
           { let user = (state.has('user')) ? state.get('user'):{};
           console.log("FILE CHANGE");
           console.log(action.payload);
            user['avatar'] = action.payload;
            state = state.set('user', user);
            return state;}
        case LoginRegisterConstants.TOGGLE_EDIT_WINDOW:
        {
            state = state.set('showEditWindow', action.payload);
            return state;
        }
        default: //otherwise state is lost!
        return state;
    }
};

export default LoginRegisterReducer;

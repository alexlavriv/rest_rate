import {LoginRegisterConstants} from './constants'
import initialState from '../../initialState'
const LoginRegisterReducer = (state = initialState.register_login, action) => {
    switch (action.type){
        case LoginRegisterConstants.OPEN_WINDOW:
            {
            state = state.set('isOpened', action.payload);
            return state;}
        case LoginRegisterConstants.USERNAME_AVAILABLE:
            state = state.set('available', action.payload.available);
            return state;
        case LoginRegisterConstants.FIELD_UPDATE:
            {let user = (state.has('user')) ? state.get('user'):{};
            user[action.payload.id] = action.payload.value;
            state = state.set('user', user);
            return state;}
        case LoginRegisterConstants.REGISTER_SUCCESS:
            {
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
            user['avatar'] = action.payload;
            state = state.set('user', user);
            return state;}
        case LoginRegisterConstants.TOGGLE_EDIT_WINDOW:
        {
            state = state.set('showEditWindow', action.payload);
            return state;
        }
        case LoginRegisterConstants.TOGGLE_EDIT:
        {
            state = state.set('enableEdit', action.payload);
            return state;
        }
        default: //otherwise state is lost!
        return state;
    }
};

export default LoginRegisterReducer;

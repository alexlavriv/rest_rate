import {LoginRegisterConstants} from './constants'
import initialState from '../../initialState'
const LoginRegisterReducer = (state = initialState.register_login, action) => {
    console.log("In LoginRegisterReducer", action);
    switch (action.type){
        case LoginRegisterConstants.OPEN_WINDOW:
            {console.log("Changing state to ", action.payload);
            state = state.set('isOpened', action.payload);
            return state;}
        case LoginRegisterConstants.FIELD_UPDATE:
           { let user = (state.has('user')) ? state.get('user'):{}
            user[action.payload.id] = action.payload.value;
            state = state.set('user', user);
            return state;}
        case LoginRegisterConstants.REGISTER_SUCCESS:
        case LoginRegisterConstants.LOGIN_SUCCESS:
            {console.log("in register\login success");
            state = state.set('token', action.payload);
            state = state.set('isOpened', {isLogin:false, isRegister:false});
            return state;}
        case LoginRegisterConstants.LOGOUT_SUCCESS:
            {state = state.set('token', "");
            state = state.set('isOpened', {isLogin:false, isRegister:false});
            return state;}
        case LoginRegisterConstants.FILE_CHANGE:
           { let user = (state.has('user')) ? state.get('user'):{}
           console.log("FILE CHNAGE")
           console.log(action.payload)
            user['avatar'] = action.payload
            state = state.set('user', user);
            return state;}
        default: //otherwise state is lost!
        return state;
    }
};

export default LoginRegisterReducer;

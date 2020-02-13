import { LoginRegisterConstants} from './constants.js';

export const openRegisterWindow = (isLogin, isRegister) =>{
    return{
        type:LoginRegisterConstants.OPEN_WINDOW,
        payload: {isLogin, isRegister}
    };
};

export const registerAction = (userDetails) =>{
    console.log("Register data: ",userDetails);
    return({
        type:LoginRegisterConstants.REGISTER,
        uri: 'http://localhost:8080/users/register',
        payload:userDetails
        })
};

 export const logIn = (userDetails) =>{
     console.log("login data: ", userDetails);
     return ({
        type: LoginRegisterConstants.LOGIN,
        uri: 'http://localhost:8080/users/login',
        payload: userDetails
        })
};

 export const logOut = (token) => {
    return( 
    {
        type:LoginRegisterConstants.LOGOUT,
        uri: 'http://localhost:8080/users/logout',
        payload: token
    })
};

export const formChangeAction = (id, value) =>{ 
    return( 
        {
            type:LoginRegisterConstants.FIELD_UPDATE,
            payload: {id,value}
        })
};

const registerSuccessAction = (id) =>{
    return( 
    {
        type:LoginRegisterConstants.REGISTER_SUCCESS,
        payload:id
    })
};

const registerFailureAction = (message) =>{
    return( 
    {
        type:LoginRegisterConstants.REGISTER_FAILURE,
        payload:message
    })

};

const loginSuccessAction = (id) =>{
    return(
    {
        type:LoginRegisterConstants.LOGIN_SUCCESS,
        payload:id
    })
};

const loginFailureAction = (message) =>{
    return(
    {
        type:LoginRegisterConstants.LOGIN_FAILURE,
        payload:message
    })
};
const logoutSuccessAction = (id) =>{
    return(
    {
        type:LoginRegisterConstants.LOGOUT_SUCCESS,
        payload:id
    })
};

const logoutFailureAction = (message) =>{
    return(
    {
        type:LoginRegisterConstants.LOGOUT_FAILURE,
        payload:message
    })
};


let LoginRegisterActions  = {
    logIn,
    logOut,
    registerAction,
    registerSuccessAction,
    registerFailureAction,
    loginSuccessAction,
    loginFailureAction,
    logoutSuccessAction,
    logoutFailureAction
};

export default LoginRegisterActions;
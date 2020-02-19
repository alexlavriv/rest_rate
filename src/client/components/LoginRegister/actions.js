import { LoginRegisterConstants} from './constants.js';

const openRegisterWindow = (isLogin, isRegister) =>{
    return{
        type:LoginRegisterConstants.OPEN_WINDOW,
        payload: {isLogin, isRegister}
    };
};

 const registerAction = (userDetails) =>{
    return({
        type:LoginRegisterConstants.REGISTER,
        uri: 'http://localhost:8080/users/register',
        payload:userDetails
        })
};

  const logIn = (userDetails) =>{
     return ({
        type: LoginRegisterConstants.LOGIN,
        uri: 'http://localhost:8080/users/login',
        payload: userDetails
        });
};
 const fileChangeAction = (file)=>{
    return( 
        {
            type:LoginRegisterConstants.FILE_CHANGE,
            payload: file
        })
};
  const logOut = (token) => {
    return(
    {
        type:LoginRegisterConstants.LOGOUT,
        uri: 'http://localhost:8080/users/logout',
        payload: token
    })
};

 const checkUsernameAction = (username) => {
    return(
        {
            type:LoginRegisterConstants.VALIDATE_USERNAME,
            uri: 'http://localhost:8080/users/' + username,
        }
    );
};

 const usernameAvailable = (json) => {
    return(
        {
            type:LoginRegisterConstants.USERNAME_AVAILABLE,
            payload: json
        }
    );
};


 const formChangeAction = (id, value) =>{
     console.log("change form action id: " + id + " value: " + value);
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

const loginSuccessAction = (json) =>{
    return(
    {
        type:LoginRegisterConstants.LOGIN_SUCCESS,
        payload:json
    })
};

const loginFailureAction = (message) =>{
    return(
    {
        type:LoginRegisterConstants.LOGIN_FAILURE,
        payload:message
    })
};
const logoutSuccessAction = () =>{
    return(
    {
        type:LoginRegisterConstants.LOGOUT_SUCCESS,
    })
};

const logoutFailureAction = (message) =>{
    return(
    {
        type:LoginRegisterConstants.LOGOUT_FAILURE,
        payload:message
    })
};


const LoginRegisterActions  = {
    openRegisterWindow,
    fileChangeAction,
    logIn,
    logOut,
    registerAction,
    registerSuccessAction,
    registerFailureAction,
    loginSuccessAction,
    loginFailureAction,
    logoutSuccessAction,
    logoutFailureAction,
    checkUsernameAction,
    usernameAvailable,
    formChangeAction
};


const EditUserShowAction = (show) =>{
    return(
        {
            type:LoginRegisterConstants.TOGGLE_EDIT_WINDOW,
            payload:show
        });
};

const ToggleEdit = (enable) => {
    return(
        {
            type:LoginRegisterConstants.TOGGLE_EDIT,
            payload: enable
        }
    );
};

const SaveEditedDetails = (prevUserName, userDetails) => {
    console.log('prevUserName', prevUserName);
    console.log('userDetails', userDetails);
    return(
        {
            type:LoginRegisterConstants.EDIT,
            uri: 'http://localhost:8080/users/edit',
            payload: {userDetails, prevUserName}
        }
    );
};

const EditSuccessAction = (id) => {
    return(
        {
            type: LoginRegisterConstants.EDIT_SUCCESS,
            payload: id
        }
    );
};
const EditFailureAction = (message) => {
    return(
        {
            type: LoginRegisterConstants.EDIT_FAILURE,
            payload: message
        }
    );
};

const EditUserActions = {
    EditUserShowAction,
    ToggleEdit,
    SaveEditedDetails,
    EditSuccessAction,
    EditFailureAction
};

export  {LoginRegisterActions, EditUserActions};
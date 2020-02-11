import { LoginRegisterConstants} from './constants.js';

export const openLoginRegisterWindow = (isLogin) =>{
    return{
       type:LoginRegisterConstants.OPEN_WINDOW,
       payload: isLogin
    };
   };
   

 const logIn = (userId, password) =>{
    return (   {
        type: LoginRegisterConstants.logIn,
        payload:{userId, password}
    })
}
 const logOut = () =>{
    return( 
    {
        type:LoginRegisterConstants.logOut
    })
}

const registerAction = (register_data) =>{
    return( 
    {
        type:LoginRegisterConstants.REGISTER,
        uri: '/createUser',
        payload:register_data
    })
}

const registerSuccesAction = (id) =>{
    return( 
    {
        type:LoginRegisterConstants.REGISTER_SUCCESS,
        payload:id
    })
}

const registerFailureAction = (message) =>{
    return( 
    {
        type:LoginRegisterConstants.REGISTER_FAILURE,
        payload:message
    })
}


let LoginRegisterActions  = {
    logIn,
    logOut,
    registerAction,
    registerSuccesAction,
    registerFailureAction

};

export default LoginRegisterActions;
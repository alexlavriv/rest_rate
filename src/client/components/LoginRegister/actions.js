import { LoginRegisterConstants} from './constants.js';

export const openRegisterWindow = (isLogin, isRegister) =>{
    return{
       type:LoginRegisterConstants.OPEN_WINDOW,
       payload: {isLogin, isRegister}
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

export const formChangeAction = (id, value) =>{ 
    return( 
        {
            type:LoginRegisterConstants.FIELD_UPDATE,
            payload: {id,value}
        })
}
export const registerAction = (register_data) =>{
    console.log("Register data: ",register_data)
    return( 
    {
        type:LoginRegisterConstants.REGISTER,
        uri: 'http://localhost:8000/users',
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
import { LoginRegisterConstants} from './constants.js';

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

const register = (register_data) =>{
    return( 
    {
        type:LoginRegisterConstants.register,
        payload:register_data
    })
}

let LoginRegisterActions  = {
    logIn,
    logOut,
    register
};

export default LoginRegisterActions;
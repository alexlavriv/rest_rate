import { ProfileViewConstants} from './constants.js';

// const openRegisterWindow = (isLogin, isRegister) =>{
//     return{
//         type:LoginRegisterConstants.OPEN_WINDOW,
//         payload: {isLogin, isRegister}
//     };
// };

const clearShowProfile = () => {
	return{
		type:ProfileViewConstants.CLOSE,
	}
};

const ProfileViewActions  = {
	clearShowProfile
};


export  {ProfileViewActions};
import {ReviewViewConstants} from './constants.js';

export const ShowProfileAction = (userName) =>{
    console.log("show profile action");
    return({
        type:ReviewViewConstants.SHOW_PROFILE,
        uri: 'http://localhost:8080/users/' + userName,
    });
};

export const gotUserSuccess = (user) => {
    console.log("got user success action, user:", user);
    return{
        type:ReviewViewConstants.GOT_USER,
        payload: user
    }
};

export const gotUserFailure = (err) => {
  return{
      type:ReviewViewConstants.GOT_USER_FAIL,
      payload: {err}
  }
};

// const ReviewViewActions = {
//     ShowProfileAction,
//     gotUserSuccess,
//     gotUserFailure
// };
//
// export default {ReviewViewActions};

import {ProfileViewConstants, ReviewListConstants, ReviewViewConstants, SearchBarConstants} from './constants'

import initialState from '../../initialState'


const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

const ReviewListReducer = (state = initialState.review_list, action) => {
 
    switch (action.type){
        case SearchBarConstants.GET_QUERY_SUCCESS:
            console.log("GET_QUERY_SUCCESS", action)
            return state = state.set('reviews', action.payload);
        case SearchBarConstants.GET_REST_NAMES_SUCCESS:
            console.log("GET_REST_NAMES_SUCCESS", action)
            return state = state.set('rest_names', action.payload.names);
        case ReviewListConstants.ADD_REVIEW_SUCCESS:
        case ReviewListConstants.GET_REVIEWS_SUCCESS:
            const updated_names = action.payload.review_list.map(review => toTitleCase(review.rest_name));
            const names = state.get('rest_names');
            const join = [...names, ...updated_names];
            const unique_names  = [...new Set(join)]
             state = state.set('rest_names', unique_names);

            return state = state.set('reviews', action.payload.review_list);
        case ReviewViewConstants.OPEN_MENU: {
            console.log('reducer open menu for review', action.payload);
            state = state.set('open_menu_id', action.payload.open_menu_id);
            state = state.set('menu_anchor', action.payload.menu_anchor);
            console.log('reducer open menu state', state);
            return state;
        }
        case ReviewViewConstants.CLOSE_MENU: {
            state = state.set('open_menu_id', "");
            state = state.set('menu_anchor', null);

            return state;
        }
        case ReviewViewConstants.GOT_USER_FAIL: {
            state = state.set('user', {});
            state = state.set('show', false);
            return state;
        }
        case ProfileViewConstants.CLOSE:
        {
            state = state.set('show', false);
            state = state.set('user', {});
            return state;
        }

        case ReviewViewConstants.GOT_USER:
        {
            console.log("got user reducer", state);
            state = state.set('user', action.payload);
            state = state.set('show', true);
            console.log(state);
            return state;
        }
        default: //otherwise state is lost!
            return state;
    }
};

export default ReviewListReducer;

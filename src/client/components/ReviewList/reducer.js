import {
    ProfileViewConstants,
    ReviewListConstants,
    ReviewViewConstants,
    SearchBarConstants,
    AdvancedSearchConstants,
    EditReviewConstants
} from './constants'

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
        case AdvancedSearchConstants.SHOW_ADVANCED_SEARCH:{
            return state.set("show_advanced_search", action.payload);
        }

        case AdvancedSearchConstants.ADVANCED_SEARCH_FORM_CHANGE:{
            let query = state.get("advanced_search_form");
            query[action.payload.id] = action.payload.value;
            console.log("###########################QUERY", query);
            return state.set("advanced_search_form", query);
        }
        case SearchBarConstants.GET_QUERY_SUCCESS:
            console.log("GET_QUERY_SUCCESS", action);
            return state = state.set('reviews', action.payload);
        case SearchBarConstants.GET_REST_NAMES_SUCCESS:
            console.log("GET_REST_NAMES_SUCCESS", action);
            return state = state.set('rest_names', action.payload.names);
        case ReviewListConstants.ADD_REVIEW_SUCCESS:
        case ReviewListConstants.GET_REVIEWS_SUCCESS:
            const updated_names = action.payload.review_list.map(review => toTitleCase(review.rest_name));
            const names = state.get('rest_names');
            const join = [...names, ...updated_names];
            const unique_names  = [...new Set(join)];
             state = state.set('rest_names', unique_names);

            return state = state.set('reviews', action.payload.review_list);
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
        case ReviewViewConstants.SET_EDIT_WINDOW:
        {
            console.log("set review edit window, review:", action.payload);
            state = state.set('open_edit_id', action.payload._id);
            state = state.set('edit_review', action.payload);
            return state;
        }
        case ReviewViewConstants.RESET_EDIT_WINDOW:
        {
            console.log('reset review edit window');
            state = state.set('open_edit_id', "");
            state = state.set('edit_review', {});
            return state;
        }
        case EditReviewConstants.EDIT_REVIEW_FORM_CHANGE:
        {
            let review = state.get('edit_review');
            review[action.payload.id] = action.payload.value;
            state = state.set('edit_review', review);
            return state;
        }
        default: //otherwise state is lost!
            return state;
    }
};

export default ReviewListReducer;

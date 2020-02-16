import {AddReviewActionsConstants} from './constants.js';


export function showWindowAction(is_open) {
  return {
    type: AddReviewActionsConstants.SHOW_WINDOW,
    payload: {
        is_open
    }
  }
}

export function formChangeAction(id, value) {
  console.log("form change action");
  return {
    type: AddReviewActionsConstants.REST_REVIEW_FORM_CHANGE,
    payload: {
        id,value
    }
  }
}

export function fileChangeAction(files) {
  console.log("form change action");
  return {
    type: AddReviewActionsConstants.REST_REVIEW_FILE_CHANGE,
    payload: files
  }
}

export function addReviewAction(review) {
  return {
    type: AddReviewActionsConstants.ADD_REVIEW,
    uri: 'http://localhost:8080/review',
    payload: review
  }
}

export function addReviewSuccessAction(review_list) {
  return {
    type: AddReviewActionsConstants.ADD_REVIEW_SUCCESS,
    payload: review_list
  }
}

export function addReviewFailAction(message) {
  return {
    type: AddReviewActionsConstants.ADD_REVIEW_FAIL,
    payload: message
  }
}

// export function changeRatingsAction(e, value) {
//   let id = e.target.id;
//   return {
//     type: AddReviewActionsConstants.REST_REVIEW_RATING_CHANGE,
//     payload: {
//       id, value
//     }
//   }
// }



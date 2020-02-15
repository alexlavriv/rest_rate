import { AddReviewActionsConstants} from './constants.js';


export function showWindowAction(is_open) {
  return {
    type: AddReviewActionsConstants.SHOW_WINDOW,
    payload: {
        is_open
    }
  }
}

export function formChangeAction(id, value) {
  return {
    type: AddReviewActionsConstants.REST_REVIEW_FORM_CHANGE,
    payload: {
        id,value
    }
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



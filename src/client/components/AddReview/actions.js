import { AddReviewActionsConstants} from './constants.js';


export function showWindowAction(is_open) {
  return {
    type: AddReviewActionsConstants.SHOW_WINDOW,
    payload: {
        is_open
    }
  }
}




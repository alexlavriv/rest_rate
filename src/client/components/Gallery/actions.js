import { GalleryActionsConstants } from './constants';

function setActiveImage(idx) {
  return {
    type: GalleryActionsConstants.SET_ACTIVE_IMAGE,
    idx: idx
  }
}

function unsetActiveImage(idx){
  return {
    type: GalleryActionsConstants.UNSET_ACTIVE_IMAGE,
    idx: idx
  }
}

function loadImagesAction(tag) {
  return {
    type: GalleryActionsConstants.LOAD_IMAGES_ACTION,
    uri: '/api/load/images',
    payload: {
      tag
    }
  }
}

function loadImagesSuccessAction(images){
  return {
    type: GalleryActionsConstants.LOAD_IMAGES_ACTION_SUCCESS,
    payload: {
      images
    }
  }
}

function loadImagesFailureAction(message){
  return {
    type: GalleryActionsConstants.LOAD_IMAGES_ACTION_FAILURE,
    message
  }
}

function cloneAction(idx) {
  return {
    type: GalleryActionsConstants.CLONE_ACTION,
    idx: idx
  }
}

function applyFilterAction(idx) {
  return {
    type: GalleryActionsConstants.APPLY_FILTER_ACTION,
    idx: idx
  }
}

function updateGalleryWidth(width){
  return {
    type: GalleryActionsConstants.UPDATE_GALLERY_WIDTH,
    payload: {
      width
    }
  }
}
function deleteAction(idx){
  return {
    type: GalleryActionsConstants.DELETE_ACTION,
    idx: idx
  }
}

let GalleryActions = {
  cloneAction,
  applyFilterAction,
  deleteAction,
  loadImagesAction,
  setActiveImage,
  unsetActiveImage,
  updateGalleryWidth,
  loadImagesSuccessAction,
  loadImagesFailureAction
};

export default GalleryActions


import { GalleryActionsConstants } from './constants'
import initialState from '../../initialState'
import { List } from 'immutable'

const FILTERS = ['none', 'sepia(100%)', 'invert(100%)', 'grayscale(100%)', 'saturate(8)', 'blur(5px)']

const GalleryReducer = (state = initialState.gallery, action) => {
  switch (action.type){
    case GalleryActionsConstants.UPDATE_GALLERY_WIDTH:
      state = state.set('galleryWidth', action.payload.width);
      return state;
    case GalleryActionsConstants.LOAD_IMAGES_ACTION_SUCCESS:
      state = state.set('images', new List(action.payload.images));
      let loadActiveFilter = List();
      action.payload.images.map(() => loadActiveFilter.push(FILTERS[0]));
      state = state.set('activeFilter', loadActiveFilter);
      return state;
    case GalleryActionsConstants.DELETE_ACTION:
      state = state.update('images', e => e.delete(action.idx));
      state = state.update('activeFilter', e => e.delete(action.idx));
      return state;
    case GalleryActionsConstants.CLONE_ACTION:
      state = state.update('images', e => e.push(state.getIn(['images', action.idx])));
      state = state.update('activeFilter', e => e.push(FILTERS[0]));
      return state;
    case GalleryActionsConstants.APPLY_FILTER_ACTION:
      state = state.setIn(['activeFilter', action.idx],
        FILTERS[Math.floor(Math.random() * Math.floor(FILTERS.length))]);
      return state;
    case GalleryActionsConstants.SET_ACTIVE_IMAGE:
      state = state.set('activeImage', action.idx);
      state = state.set('openLightBox', true);
      return state;
    case GalleryActionsConstants.UNSET_ACTIVE_IMAGE:
      state = state.set('openLightBox', false);
      return state;
    default: //otherwise state is lost!
      return state;
  }
};

export default GalleryReducer

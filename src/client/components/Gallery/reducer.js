import { GalleryActionsConstants } from './constants'
import initialState from '../../initialState'
import { List } from 'immutable'

const FILTERS = ['none', 'sepia(100%)', 'invert(100%)', 'grayscale(100%)', 'saturate(8)', 'blur(5px)']

const GalleryReducer = (state = initialState.gallery, action) => {
  console.log('GalleryReducerState=', state);
  switch (action.type){
    case GalleryActionsConstants.UPDATE_GALLERY_WIDTH:
      console.log('RECEIVED: GalleryActionsConstants.UPDATE_GALLERY_WIDTH');
      console.log('ACTION:', action);
      state = state.set('galleryWidth', action.payload.width);
      console.log('NEW STATE=', state);
      return state;
    case GalleryActionsConstants.LOAD_IMAGES_ACTION_SUCCESS:
      console.log('RECEIVED: GalleryActionsConstants.LOAD_IMAGES_ACTION_SUCCESS');
      console.log('ACTION:', action);
      state = state.set('images', new List(action.payload.images));
      let loadActiveFilter = List();
      action.payload.images.map(() => loadActiveFilter.push(FILTERS[0]));
      state = state.set('activeFilter', loadActiveFilter);
      console.log('NEW STATE=', state);
      return state;
    case GalleryActionsConstants.DELETE_ACTION:
      console.log('GalleryActionsConstants.DELETE_ACTION');
      console.log('ACTION:', action);
      state = state.update('images', e => e.delete(action.idx));
      state = state.update('activeFilter', e => e.delete(action.idx));
      console.log('NEW STATE=', state);
      return state;
    case GalleryActionsConstants.CLONE_ACTION:
      console.log('RECEIVED: GalleryActionsConstants.CLONE_ACTION');
      console.log('ACTION:', action);
      state = state.update('images', e => e.push(state.getIn(['images', action.idx])));
      state = state.update('activeFilter', e => e.push(FILTERS[0]));
      console.log('NEW STATE=', state);
      return state;
    case GalleryActionsConstants.APPLY_FILTER_ACTION:
      console.log('RECEIVED: GalleryActionsConstants.APPLY_FILTER_ACTION');
      console.log('ACTION:', action);
      console.log('STATE:', state);
      state = state.setIn(['activeFilter', action.idx],
        FILTERS[Math.floor(Math.random() * Math.floor(FILTERS.length))]);
      console.log('NEW STATE=', state);
      return state;
    case GalleryActionsConstants.SET_ACTIVE_IMAGE:
      console.log('RECEIVED: GalleryActionsConstants.SET_ACTIVE_IMAGE');
      console.log('ACTION:', action);
      state = state.set('activeImage', action.idx);
      state = state.set('openLightBox', true);
      console.log('NEW STATE=', state);
      return state;
    case GalleryActionsConstants.UNSET_ACTIVE_IMAGE:
      console.log('RECEIVED: GalleryActionsConstants.UNSET_ACTIVE_IMAGE');
      console.log('ACTION:', action);
      state = state.set('openLightBox', false);
      console.log('NEW STATE=', state);
      return state;
    default: //otherwise state is lost!
      return state;
  }
};

export default GalleryReducer

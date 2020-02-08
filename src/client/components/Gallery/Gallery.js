import React from 'react';
import { Lightbox } from 'react-modal-image';
import Image from '../Image';
import './Gallery.scss';
import {connect} from 'react-redux';
import GalleryActions from '../Gallery/actions';

class Gallery extends React.Component {


  static getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }


  componentDidMount() {
    this.props.updateGalleryWidthEventHandler(Gallery.getGalleryWidth());
  }

  render() {
    return (
      <div className="gallery-root">
        {this.props.images.map((dto, idx) => {
          return <Image
            key={'image-' + dto.id + idx}
            id={idx}
            dto={dto}
            handleClone={(idx) => this.props.cloneEventHandler(idx)}
            handleDelete={idx => this.props.deleteEventHandler(idx)}
            handleLightBox={idx => this.props.setActiveImageEventHandler(idx)}
            galleryWidth={this.props.galleryWidth}/>;
        })}
        {this.props.openLightBox && (
          <Lightbox
            medium={Image.urlFromDto(this.props.images.get(this.props.activeImage))}
            large={Image.urlFromDto(this.props.images.get(this.props.activeImage))}
            onClose={() => this.props.applyCloseLightBoxEventHandler(this.props.activeImage)}
          />)}

      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    images: state['gallery'].get('images'),
    size: state['app'].get('size'),
    activeImage: state['gallery'].get('activeImage'),
    openLightBox: state['gallery'].get('openLightBox'),
    activeFilter: state['gallery'].getIn(['activeFilter', props.idx])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadImagesEventHandler: (images) => {
      dispatch(GalleryActions.loadImagesAction(images))
    },
    cloneEventHandler: (idx) => {
      dispatch(GalleryActions.cloneAction(idx));
    },
    deleteEventHandler: (idx) => {
      dispatch(GalleryActions.deleteAction(idx));
    },
    updateGalleryWidthEventHandler: (width) => {
      dispatch(GalleryActions.updateGalleryWidth(width));
    },
    applyCloseLightBoxEventHandler: (idx) => {
      dispatch(GalleryActions.unsetActiveImage(idx));
    },
    setActiveImageEventHandler: (idx) => {
      dispatch(GalleryActions.setActiveImage(idx));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

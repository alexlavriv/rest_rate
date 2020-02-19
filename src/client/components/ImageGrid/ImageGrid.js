import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import './ImageGrid.scss'

import {connect} from 'react-redux';

/* eslint-disable no-use-before-define */



class ImageGrid extends React.Component {

    render(){
        const reviewViews = this.props.images.map((currentImage, index) => {
            const imgSrc = `data:image/gif;base64,${currentImage}`;
            return (
                <img key={index} className="image-sim" src={imgSrc}/>
            );
        });

            return (<div className="image-grid-root">
                        {reviewViews}
                    </div>)
             
    }
}

const mapStateToProps = state =>{
  
  return {};
};

function mapDispatchToProps(dispatch) {
    return({
       
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);

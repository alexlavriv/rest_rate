import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import './ImageGrid.scss'

import {connect} from 'react-redux';

/* eslint-disable no-use-before-define */



class ImageGrid extends React.Component {

    render(){
        const reviewViews = this.props.images.map((current_iamge, index) => {
            const imgSrc = `data:image/gif;base64,${current_iamge}`;
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
    console.log('dispatch');
    return({
       
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);

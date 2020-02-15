
import React from 'react';
import './ReviewView.scss'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {showWindowAction, formChangeAction, addReviewAction} from './actions'




class ReviewView extends React.Component {

    render(){
      return(
      <div className="ReviewView-root">
       <div className="ReviewView-header">{this.props.review.rest_name}</div> 
       <div className="ReviewView-body">
       {this.props.review.rest_review}
         </div> 
         <div className= "ReviewView-rating">
         <div >Bathroom Quality:</div>
         <div >Staff Kindness:</div>
         <div >Cleanliness:</div>
         <div >Drive-thru quality:</div>
         <div >Delivery Speed:</div>
         <div >Food Quality:</div>
         </div>
         <div className="ReviewView-author">Alex Lavriv  {this.props.test}</div>
        </div>
      );
    }
}

const mapStateToProps = state =>{
   
  return {};
};

function mapDispatchToProps(dispatch) {

    return({
       
    });
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewView);

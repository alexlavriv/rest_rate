
import React from 'react';

import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {GetRewiewsAction} from './actions'
import ReviewView from '../ReviewView'



class ReviewList extends React.Component {
    componentDidMount(){
      console.log("ReviewList mount")
      this.props.getReviews();

    }
    render(){
      console.log(this.props.reviews)
     const reviewViews= this.props.reviews.map(current_review =>{
        return (
       <ReviewView key={current_review._id} review={current_review}/>
        );
      })

     return (
       <div>
          {reviewViews}
      </div>
      );
    }
}

const mapStateToProps = state =>{
  const reviews = state["review_list"].get("reviews");
  return {
    reviews
  };
};

function mapDispatchToProps(dispatch) {
  
    return({
      
       getReviews: () => {dispatch(GetRewiewsAction())}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);

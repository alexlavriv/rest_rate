import React from 'react';
import './ReviewView.scss'
import {connect} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";


class ReviewView extends React.Component {


    render(){
        function showRating(review, id, name){
            return(
                <div>
                    <Typography component="legend">{name}</Typography>
                    <Rating name={id} value={review[id]} readOnly />
                </div>
            );
        }
        return(
            <div className="ReviewView-root">
                <div className="ReviewView-header">{this.props.review.rest_name}</div>
                <div className="ReviewView-body">
                    {this.props.review.rest_review}
                </div>
                <div className="ReviewView-rating">
                    {showRating(this.props.review, "bathroom_rating", "Bathroom Quality:")}
                    {showRating(this.props.review, "staff_rating", "Staff Kindness:")}
                    {showRating(this.props.review, "clean_rating", "Cleanliness:")}
                    {showRating(this.props.review, "drive_rating", "Drive-thru quality:")}
                    {showRating(this.props.review, "delivery_rating", "Delivery Speed:")}
                    {showRating(this.props.review, "food_rating", "Food Quality:")}
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

import React from 'react';
import './ReviewView.scss'
import {connect} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import ImageGrid from '../ImageGrid'
import {
    DeleteReviewAction,
    SetEditWindowAction,
    ShowProfileAction
} from "./actions";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditReview from "./EditReview";

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

        function renderEditRemoveButtons(props) {
            return(
                <div>
                    <IconButton aria-label="delete" size="small" style={{'display':'block', 'float':'right'}}
                                onClick={() => props.setEditWindow(props.review)}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <EditReview review={props.review} open={props.open_edit_id}/>
                    <IconButton aria-label="delete" size="small"
                                style={{'display':'block', 'float':'right'}}
                                onClick={() => props.deleteReview(props.review._id)}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </div>

            )
        }

        function printWhyNotOpened(userName, reviewName) {
            console.log("Didnt show edit buttons, got:", userName, reviewName);
        }

        return(
            <div className="ReviewView-root">
                {this.props.user.login_name !== undefined && this.props.user.login_name === this.props.review.user_name
                    ? renderEditRemoveButtons(this.props)
                    : printWhyNotOpened(this.props.user.login_name, this.props.review.user_name)}
                <div className="ReviewView-header">{this.props.review.rest_name}</div>
                <div className="ReviewView-body">
                    {this.props.review.rest_review}
                </div>
                <ImageGrid images={this.props.review.files}/>
                <div className="ReviewView-rating">
                    {showRating(this.props.review, "bathroom_rating", "Bathroom Quality:")}
                    {showRating(this.props.review, "staff_rating", "Staff Kindness:")}
                    {showRating(this.props.review, "clean_rating", "Cleanliness:")}
                    {showRating(this.props.review, "drive_rating", "Drive-thru quality:")}
                    {showRating(this.props.review, "delivery_rating", "Delivery Speed:")}
                    {showRating(this.props.review, "food_rating", "Food Quality:")}
                </div>

                <div className="ReviewView-author">
              
                   <div  onClick={() => {console.log('this.props.review.user_name:', this.props.review.user_name, 'this.props.user.login_name:', this.props.user.login_name); this.props.showProfile(this.props.review.user_name)}}>author: <span>{this.props.review.user_name} </span> </div>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
  return {state};
};


function mapDispatchToProps(dispatch) {
    return({
        deleteReview: (review_id) => {dispatch(DeleteReviewAction(review_id))},
        setEditWindow: (review) => {dispatch(SetEditWindowAction(review))},
        showProfile: (userName) => {console.log("dispatching"); dispatch(ShowProfileAction(userName))}
        });
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewView);

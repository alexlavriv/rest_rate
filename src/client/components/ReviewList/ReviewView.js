import React from 'react';
import './ReviewView.scss'
import {connect} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import ImageGrid from '../ImageGrid'
import ProfileView from "../ProfileView/ProfileView";
import {CloseMenuAction, OpenMenuAction, ShowProfileAction} from "./actions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
                <Button aria-controls="simple-menu"
                        aria-haspopup="true"
                        style={{'display':'block', 'float':'right'}}
                        onClick={this.props.openMenu()}>
                    <MoreVertIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    keepMounted
                    open={false}
                    onClose={this.props.closeMenu()}
                >
                    <MenuItem onClick={this.props.closeMenu()}>Edit</MenuItem>
                    <MenuItem onClick={this.props.closeMenu()}>Delete</MenuItem>
                </Menu>
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

                <div className="ReviewView-author" onClick={() => {console.log('clicky', this.props.state); this.props.showProfile(this.props.review.user_name)}}>{this.props.review.user_name}</div>
            </div>
        );
    }
}

const mapStateToProps = state =>{
  return {state};
};


function mapDispatchToProps(dispatch) {
    return({
        openMenu: () => {dispatch(OpenMenuAction())},
        closeMenu: () => {dispatch(CloseMenuAction())},
        showProfile: (userName) => {console.log("dispatching"); dispatch(ShowProfileAction(userName))}
        });
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewView);

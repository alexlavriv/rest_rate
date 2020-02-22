import React from 'react';
import './ReviewView.scss'
import {connect} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import ImageGrid from '../ImageGrid'
import ProfileView from "./ProfileView";
import {CloseMenuAction, OpenMenuAction, ShowProfileAction} from "./actions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

        function renderEditRemoveButtons() {
            return(
                <div>
                    <IconButton aria-label="delete" size="small" style={{'display':'block', 'float':'right'}}
                                // onClick={}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small"
                                style={{'display':'block', 'float':'right'}}
                                // onClick={}
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
                {this.props.user.login_name !== undefined && this.props.user.login_name === this.props.review.user_name ? renderEditRemoveButtons() : printWhyNotOpened(this.props.user.login_name, this.props.review.user_name)}

                {/*<Button aria-controls="simple-menu"*/}
                {/*        aria-haspopup="true"*/}
                {/*        style={{'display':'block', 'float':'right'}}*/}
                {/*        onClick={(e) => {console.log('open', e.currentTarget, 'key', this.props.review._id); this.props.openMenu(this.props.review._id, e.currentTarget)}}>*/}
                {/*    <MoreVertIcon />*/}
                {/*</Button>*/}
                {/*<Menu*/}
                {/*    id="simple-menu"*/}
                {/*    keepMounted*/}
                {/*    anchorEl={this.props.anchor}*/}
                {/*    open={this.props.menu === this.props.key}*/}
                {/*    onClose={() => {console.log('close'); this.props.closeMenu()}}*/}
                {/*>*/}
                {/*    <MenuItem onClick={() => {console.log('close edit'); this.props.closeMenu()}}>Edit</MenuItem>*/}
                {/*    <MenuItem onClick={() => {console.log('close delete'); this.props.closeMenu()}}>Delete</MenuItem>*/}
                {/*</Menu>*/}
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
        openMenu: (review_id, target) => {console.log('dispatch open menu with review_id:', review_id, 'and target:', target); dispatch(OpenMenuAction(review_id, target))},
        closeMenu: () => {dispatch(CloseMenuAction())},
        showProfile: (userName) => {console.log("dispatching"); dispatch(ShowProfileAction(userName))}
        });
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewView);

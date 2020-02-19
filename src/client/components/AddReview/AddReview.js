import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {addReviewAction, formChangeAction, showWindowAction, fileChangeAction} from './actions'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {DropzoneArea} from 'material-ui-dropzone'
import Tooltip from '@material-ui/core/Tooltip';
import './AddReview.scss'

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const styles = theme => {
    return ({
        paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }})
    };

class AddReview extends React.Component {
    getModelStyle() {
        const top = 50;
        const left = 50;
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }

    render(){
        const { classes } = this.props;
        const modalStyle = this.getModelStyle();
        function setRating(props, id, name) {
            return (
                <div>
                    <Typography component="legend">{name}</Typography>
                    <Rating name={id}
                            onChange={(event, newValue) => props.changeRatings(id, newValue)}
                    />
                </div>
            )
        }
        const modal = (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose= {()=> this.props.openWindow(false)}>
                <div style={modalStyle} className={classes.paper}>

                    <TextField id="rest_name" fullWidth margin="normal" onChange = {(e)=>this.props.formChange(e)}
                               label="Restaurant Name" />
                    <TextField id="rest_review"  multiline rows="15" variant="outlined" fullWidth
                               margin="normal" onChange = {(e)=>this.props.formChange(e)}
                               label="Review" />
                    <div className="ratings" >
                        {setRating(this.props,"bathroom_rating", "Bathroom Quality:")}
                        {setRating(this.props,"staff_rating", "Staff Kindness:")}
                        {setRating(this.props,"clean_rating", "Cleanliness:")}
                        {setRating(this.props,"drive_rating", "Drive-thru quality:")}
                        {setRating(this.props,"delivery_rating", "Delivery Speed:")}
                        {setRating(this.props,"food_rating", "Food Quality:")}
                    </div>

                    <div className="addreview-dropzone"><DropzoneArea filesLimit='20' onChange={(event)=>this.props.fileChange(event)} /></div>
                    <Button onClick={()=>this.props.submit_review(this.props.review, this.props.user.login_name)}
                            style={{'display':'block', 'float':'right'}} variant="contained" color="primary">ADD</Button>
                </div>
            </Modal>);
            return (
                <div>
                    <HtmlTooltip classes={{ tooltip: classes.noMaxWidth }} disableHoverListener={this.props.token !== undefined} title="Please login to add reviews">
                        <span>
                            <IconButton disabled={!this.props.token} onClick={()=>this.props.openWindow(true)}  color="primary" aria-label="add review">
                                <AddCircleIcon  style={{ fontSize: 70 }}  />
                            </IconButton>
                        </span>
                    </HtmlTooltip>
                    {modal}
                </div>
            );
       

    }
}

const mapStateToProps = (state) =>{
    const open = state.add_review.get("show");
    const review = state.add_review.get('review');
    const token = state.login_register.get("token");
    const user = state.login_register.get('user');
    return {open, token, review, user};
};

function mapDispatchToProps(dispatch) {
    return({
        submit_review:(review, loginName)=>{dispatch(addReviewAction(review, loginName))},
        openWindow: (show) => {dispatch (showWindowAction(show))},
        formChange: (e) => {dispatch(formChangeAction(e.target.id, e.target.value))},
        changeRatings: (id, val) => {
            dispatch(formChangeAction(id, val))},
        fileChange:(files)=>{dispatch(fileChangeAction(files))}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddReview));

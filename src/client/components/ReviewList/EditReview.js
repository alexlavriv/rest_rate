import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import './EditReview.scss'
import {EditReviewAction, EditReviewFormChangeAction, ResetEditWindowAction} from "./actions";

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

class EditReview extends React.Component {
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
							defaultValue={props.review[id]}
					/>
				</div>
			)
		}
		console.log(this.props.open_edit_id);
		return (
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={Boolean(this.props.openEditId) && this.props.openEditId === this.props.review._id}
				onClose= {() => {this.props.resetEditWindow()}}>
				<div style={modalStyle} className={classes.paper}>
					<TextField id="rest_name" fullWidth margin="normal"
							   onChange = {(e)=>this.props.formChange(e)}
							   label="Restaurant Name"
							   defaultValue={this.props.review.rest_name}
							   disabled/>
					<TextField id="rest_review"  multiline rows="15" variant="outlined" fullWidth
							   margin="normal" onChange = {(e)=>this.props.formChange(e)}
							   label="Review"
							   defaultValue={this.props.review.rest_review}/>
					<div className="ratings" >
						{setRating(this.props,"bathroom_rating", "Bathroom Quality:")}
						{setRating(this.props,"staff_rating", "Staff Kindness:")}
						{setRating(this.props,"clean_rating", "Cleanliness:")}
						{setRating(this.props,"drive_rating", "Drive-thru quality:")}
						{setRating(this.props,"delivery_rating", "Delivery Speed:")}
						{setRating(this.props,"food_rating", "Food Quality:")}
					</div>
					<Button onClick={()=>{this.props.editReview(this.props.editedReview); this.props.resetEditWindow()}}
							style={{'display':'block', 'float':'right'}} variant="contained" color="primary">EDIT</Button>
				</div>
			</Modal>
		);


	}
}

const mapStateToProps = (state) =>{
	const openEditId = state['review_list'].get('open_edit_id');
	const editedReview = state['review_list'].get('edit_review');
	return {openEditId, editedReview};
};

function mapDispatchToProps(dispatch) {
	return({
		// submit_review:(review, loginName)=>{dispatch(addReviewAction(review, loginName))},
		// openWindow: (show) => {dispatch (showWindowAction(show))},
		formChange: (e) => {dispatch(EditReviewFormChangeAction(e.target.id, e.target.value))},
		changeRatings: (id, val) => {dispatch(EditReviewFormChangeAction(id, val))},
		// fileChange:(files)=>{dispatch(fileChangeAction(files))}
		resetEditWindow: () => {dispatch(ResetEditWindowAction())},
		editReview: (editedReview) => {dispatch(EditReviewAction(editedReview))}
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditReview));

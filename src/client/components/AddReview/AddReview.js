
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {showWindowAction, formChangeAction, addReviewAction} from './actions'




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
      return (
        <div>
          <IconButton onClick={()=>this.props.openWindow(true)}  color="primary" aria-label="add review">
            <AddCircleIcon  style={{ fontSize: 70 }}  />
          </IconButton>
          <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose= {()=> this.props.openWindow(false)}   >
                <div style={modalStyle} className={classes.paper} > 
                
                <TextField  id="rest_name" fullWidth margin="normal" onChange = {(e)=>this.props.formChange(e)} label="Restaraunt Name" />
                <TextField  id="rest_review"  multiline rows="20"
          variant="outlined" fullWidth
          margin="normal" onChange = {(e)=>this.props.formChange(e)} label="Review" />
                <Button onClick={()=>this.props.sumbit_review(this.props.review)}
                        style={{'display':'block', 'float':'right'}} variant="contained" color="primary">ADD</Button>

                
                </div>
            </Modal>
        </div>
          );
    }
}

const mapStateToProps = state =>{
    const open = state["add_review"].get("show") 
    console.log("mapStateToProps " + open)
    const review = state["add_review"].get('review')
  const token = state["login_register"].get("token");

  return {open, token, review};
};

function mapDispatchToProps(dispatch) {
    console.log('dispatch');
    return({
        sumbit_review:(review)=>{dispatch(addReviewAction(review))},
        openWindow: (show) => {dispatch (showWindowAction(show))},
        formChange: (e) => {dispatch(formChangeAction(e.target.id, e.target.value))},

    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddReview));

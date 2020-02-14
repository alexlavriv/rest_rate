
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {showWindowAction} from './actions'




const styles = theme => {
    return ({
        paper: {
        position: 'absolute',
        width: 400,
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
                <div style={modalStyle} className={classes.paper} > </div>
            </Modal>
        </div>
          );
    }
}

const mapStateToProps = state =>{
    const open = state["add_review"].get("show") 
    console.log("mapStateToProps " + open)

  const token = state["login_register"].get("token");

  return {open, token};
};

function mapDispatchToProps(dispatch) {
    console.log('dispatch');
    return({
        openWindow: (show) => {dispatch (showWindowAction(show))},
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddReview));

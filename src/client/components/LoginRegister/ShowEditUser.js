import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {EditUserActions} from "./actions";

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

class ShowEditUser extends React.Component{

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
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.show}
                    onClose= { () => {this.props.ShowEditUser(false)}}   >
                    <div style={modalStyle} className={classes.paper} >

                        <div style={this.props.show?{'display':'block'}:{'display':'none'}}>
                            <h2>IM AN EDIT WINDOW!!</h2>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const show = state['login_register'].get('showEditWindow');

    return {show};
};

function mapDispatchToProps(dispatch) {

    return({
        ShowEditUser: (show) => {dispatch(EditUserActions.EditUserShowAction(show))}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShowEditUser));
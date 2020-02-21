import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import "./ProfileView.scss"
import List from "@material-ui/core/List";
import {ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import {LoginRegisterActions} from "../LoginRegister/actions";
import {ProfileViewActions} from "./actions";

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

class ProfileView extends React.Component{

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
                    onClose= {() => {this.props.clearShowProfile()}} >
                    <div style={modalStyle} className={classes.paper} >
                        <div style={this.props.show?{'display':'block'}:{'display':'none'}}>
                            {console.log('view profile')}
                            <h2>Profl!!!!!!!e!</h2>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    const show = state.view_profile.get("show");

    // const show = state['profile_view'].show;

    return {show};
};

function mapDispatchToProps(dispatch) {
    return({
        clearShowProfile: () => {dispatch(ProfileViewActions.clearShowProfile())},
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileView));
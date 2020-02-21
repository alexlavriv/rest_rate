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
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = theme => {
    return ({
        paper: {
            position: 'absolute',
            width: 600,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            margin: 'auto'
        },
        root: {
            flexGrow: 1,
        },
    })
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
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar alt="Person"
                                            className={classes.avatar}
                                            id="avatar-size"
                                            src={`data:image/gif;base64,${this.props.profileUserDetails.avatar}`}
                                            to="/settings"
                                    />
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Typography className={classes.name} variant="h3">
                                            {this.props.profileUserDetails.login_name}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>Location: {this.props.profileUserDetails.location}</Typography>
                                        <Typography variant="body1" gutterBottom>Joined: {this.props.profileUserDetails.join_date}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button  margin="normal"
                                     // onClick={()=>props.register(props.userDetails)}
                                     style={{'display':'block', 'float':'right'}}
                                     variant="contained" color="primary">Show Reviews</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    const show = state.review_list.get("show");
    // const profileUserDetails = state.view_profile.get("user");
    const profileUserDetails = state.review_list.get("user");
    // const show = state['profile_view'].show;

    return {show, profileUserDetails};
};

function mapDispatchToProps(dispatch) {
    return({
        clearShowProfile: () => {dispatch(ProfileViewActions.clearShowProfile())},
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileView));
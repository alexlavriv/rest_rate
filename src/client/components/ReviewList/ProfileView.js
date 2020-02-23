import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import "./ProfileView.scss"
import Avatar from "@material-ui/core/Avatar";
import {ProfileViewActions, SearchBarActions} from "./actions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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

        function generateDateString(date) {
            console.log('date:', date);
            if (date) {
                let splitted = date.toString().split('-');
                let splittedDay = splitted[2].split('T')[0];
                let format = splittedDay + '/' + splitted[1] + '/' + splitted[0];
                console.log('DATE FORMAT:', format);
                return format;
            }
        }


        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.show}
                    onClose= {() => {this.props.clearShowProfile()}} >
                    <div style={modalStyle} className={classes.paper} >
                        <div   style={this.props.show?{'display':'block'}:{'display':'none'}}>
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
                                        <Typography variant="body1" gutterBottom>Joined: {generateDateString(this.props.profileUserDetails.createdAt)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button 
                                     onClick={()=>{this.props.getQuery(this.props.profileUserDetails._id); this.props.clearShowProfile()}}
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
        getQuery: (query) => {dispatch(SearchBarActions.GetQueryAction(query, true))},
        clearShowProfile: () => {dispatch(ProfileViewActions.clearShowProfile())},
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileView));
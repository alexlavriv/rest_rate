import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {EditUserActions, LoginRegisterActions} from "./actions";
import './LoginRegister.scss'
import "./ShowEditUser.scss"
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import {ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CountrySelect from "../CountryAutoComplete";
import {DropzoneArea} from "material-ui-dropzone";
import Avatar from "@material-ui/core/Avatar";

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

        function renderEditButton(props) {
            return(
                <IconButton onClick={() => {props.enableEdit()}} edge="end" aria-label="edit">
                    <EditIcon />
                </IconButton>
            )
        }

        function renderBackButton(props) {
            return(
                <IconButton onClick={() => {props.disableEdit()}} edge="end" aria-label="edit">
                    <ArrowBackIosIcon />
                </IconButton>
            )
        }

        function renderForm(props) {
            let prevLoginName = props.userDetails.login_name;
            return(
                <form noValidate autoComplete="off" onChange={(e)=>props.formChange(e)} >
                    <TextField disabled={!props.showEdit} style={{"height":"50px"}}
                               onChange={(e) => {
                                   if (e.target.value !== prevLoginName) {
                                       // props.checkAvailability(e.target.value);
                                       props.formChange(e);
                                   }}}
                               error={!props.available} helperText={props.available===false ? "USER ALREADY EXISTS":""}
                               required fullWidth margin="normal" id="login_name"
                               label="Username" defaultValue={props.userDetails.login_name}/>
                    <CountrySelect disabled={!props.showEdit}  />

                    <Button margin="normal" onClick={() => {props.save(prevLoginName, props.userDetails); prevLoginName = props.userDetails.login_name}}
                            style={{'display':'block', 'float':'right'}} variant="contained"
                            color="primary" disabled={!props.available}>Save</Button>
                </form>
            )
        }
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.show}
                    onClose= { () => {this.props.ShowEditUser(false)}}   >
                    <div style={modalStyle} className={classes.paper} >

                        <div style={this.props.show?{'display':'block'}:{'display':'none'}}>
                            <List component="nav" aria-label="user profile">
                                <ListItem>
                                    <Avatar id="avatar-size" src={`data:image/gif;base64,${this.props.userDetails.avatar}`} />
                                    <ListItemSecondaryAction>
                                        {this.props.showEdit ? renderBackButton(this.props) : renderEditButton(this.props)}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    {renderForm(this.props)}
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const show = state['login_register'].get('showEditWindow');
    const userDetails = state["login_register"].get("user");
    const available = state['login_register'].get('available');
    const showEdit = state['login_register'].get('enableEdit');

    return {show, userDetails, available, showEdit};
};

function mapDispatchToProps(dispatch) {

    return({
        ShowEditUser: (show) => {dispatch(EditUserActions.EditUserShowAction(show))},
        formChange: (e) => {dispatch(LoginRegisterActions.formChangeAction(e.target.id, e.target.value))},
        checkAvailability: (username) => {dispatch(LoginRegisterActions.checkUsernameAction(username))},
        save: (prevLoginName, userDetails) =>{dispatch(EditUserActions.SaveEditedDetails(prevLoginName, userDetails))},
        fileChange: (file) => {dispatch(LoginRegisterActions.fileChangeAction(file[0]))},
        enableEdit: () => {dispatch(EditUserActions.ToggleEdit(true))},
        disableEdit: () => {dispatch(EditUserActions.ToggleEdit(false))}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShowEditUser));
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CountrySelect from '../CountryAutoComplete';
import './LoginRegister.scss'
import Tooltip from '@material-ui/core/Tooltip';
import {EditUserActions, LoginRegisterActions} from './actions'
import {connect} from 'react-redux';
import {DropzoneArea} from 'material-ui-dropzone'
import ShowEditUser from './ShowEditUser'
import Avatar from "@material-ui/core/Avatar";
import Geosuggest from 'react-geosuggest';
import ScriptTag from 'react-script-tag';
import FormControl from "@material-ui/core/FormControl";
/* eslint-disable no-use-before-define */

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


class simpleModal extends React.Component {
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

        function renderLogout(props) {

            const imgSrc = `data:image/gif;base64,${props.userDetails.avatar}`;
          
            return (
                <div className="loginRegister-root">
                    <Tooltip title={props.userDetails.login_name + ' - Edit Profile'}>
                        <Avatar  className="edit-profile-avatar" onClick={() => {props.ShowEditUser(true)}} src={imgSrc} />
                    </Tooltip>
                    <ShowEditUser />
                    <div className="loginRegister-link" onClick={() => props.logout(props.token)}>Logout</div>
                </div>
            )
        }

        function renderLoginRegister(props) {
            return (
                <div className="loginRegister-root">
                    <div className="loginRegister-link" onClick={()=> props.openWindow(true, false)} >Login</div>
                  
                    <div className="loginRegister-link" onClick={()=> props.openWindow(false, true)} >Register</div>

                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={props.open}

                        onClose= {()=> props.openWindow(false,false)}   >
                        <div style={modalStyle} className={classes.paper} >
                            <div style={props.isLogin?{'display':'block'}:{'display':'none'}}>
                                <form onChange = {(e)=>props.formChange(e)} onSubmit={() => props.login(props.userDetails)} noValidate autoComplete="off">
                                    <TextField fullWidth margin="normal"  id="login_name"  label="Username" />
                                    <TextField fullWidth margin="normal" type="password" id="password" label="Password" />
                                    <div className="login-error" style={props.login_error?{' visibility':'visible'}:{'visibility':'hidden'}}>Wrong login or password</div>
                                    <Button onClick={ () => props.login(props.userDetails) }
                                           style={{'display':'block', 'float':'right'}}  variant="contained" color="primary">Login</Button>
                                </form>
                            </div>
                            <div style={props.isRegister?{'display':'block'}:{'display':'none'}}>

                                <form noValidate autoComplete="off" onChange={(e)=>props.formChange(e)} >
                                    <TextField style={{"height":"50px"}} onChange={(e)=>props.checkAvailability(e.target.value)} error={!props.available} helperText={props.available===false ? "USER ALREADY EXISTS":""} required fullWidth margin="normal" id="login_name"
                                             label="Username" />
                                    <TextField required fullWidth type="password" margin="normal"  id="password" label="Password" />
                                    <CountrySelect  />
                                    <div  className="loginRegister-dropzone" >
                                    <DropzoneArea   filesLimit={1} id="avatar" onChange={(event)=>props.fileChange(event)}/>
                                    </div>
                                    <Button    margin="normal" onClick={()=>props.register(props.userDetails)}
                                            style={{'display':'block', 'float':'right'}} variant="contained" color="primary" disabled={!props.available}>Register</Button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }

        if (this.props.token){
            return renderLogout(this.props);
        } else {
            return renderLoginRegister(this.props);
        }
    }
}

const mapStateToProps = state =>{
  const isLogin = state["login_register"].get("isOpened").isLogin;
  const isRegister = state["login_register"].get("isOpened").isRegister;
  const userDetails = state["login_register"].get("user");
  const open = isLogin || isRegister;
  const token = state["login_register"].get("token");
  const available = state['login_register'].get('available');
  const login_error = state['login_register'].get('login_error');


  return {open, isLogin, isRegister, userDetails, token, available, login_error};
};

function mapDispatchToProps(dispatch) {
    return({
        openWindow: (isRegister, isLogin) => {dispatch(LoginRegisterActions.openRegisterWindow(isRegister, isLogin))},
        formChange: (e) => {dispatch(LoginRegisterActions.formChangeAction(e.target.id, e.target.value))},

        checkAvailability: (username) => {dispatch(LoginRegisterActions.checkUsernameAction(username))},
        register: (userDetails) =>{dispatch(LoginRegisterActions.registerAction(userDetails))},
        login: (userDetails) => {dispatch(LoginRegisterActions.logIn(userDetails))},
        logout: (token) => {dispatch(LoginRegisterActions.logOut(token))},
        fileChange: (file) => {dispatch(LoginRegisterActions.fileChangeAction(file[0]))},
        ShowEditUser: (show) => {dispatch(EditUserActions.EditUserShowAction(show))}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(simpleModal));

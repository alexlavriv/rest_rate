import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CountrySelect from '../CountryAutoComplete';
import './LoginRegister.scss'
import {
    checkUsernameAction,
    fileChangeAction,
    formChangeAction,
    logIn,
    logOut,
    openRegisterWindow,
    registerAction
} from './actions'
import {connect} from 'react-redux';
import {DropzoneArea} from 'material-ui-dropzone'
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
                    <div>{props.userDetails.login_name} </div>
                    <img className="loginRegister-avatar" src={imgSrc} alt="Edit Profile"/>
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
                                    <TextField fullWidth margin="normal"  id="login_name"  label="Login" />
                                    <TextField fullWidth margin="normal" id="password" label="Password" />
                                    <Button onClick={ () => props.login(props.userDetails) }
                                            style={{'display':'block', 'float':'right'}} variant="contained" color="primary">Login</Button>
                                </form>
                            </div>
                            <div style={props.isRegister?{'display':'block'}:{'display':'none'}}>
                                <form noValidate autoComplete="off" onChange = {(e)=>props.formChange(e)}>
                                    <TextField required fullWidth margin="normal" id="login_name"
                                               onBlur = {(e)=>props.checkAvailability(e.target.value)} label="Login" />
                                    <TextField required fullWidth margin="normal"  id="password" label="Password" />
                                    <CountrySelect/>
                                    <DropzoneArea id="avatar" onChange={(event)=>props.fileChange(event)}/>
                                    <Button  onClick={()=>props.register(props.userDetails)}
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
  console.log("The state of login register is:");
  console.log(state["login_register"].get("isOpened"));
  const isLogin = state["login_register"].get("isOpened").isLogin;
  const isRegister = state["login_register"].get("isOpened").isRegister;
  const userDetails = state["login_register"].get("user");
  const open = isLogin || isRegister;
  const token = state["login_register"].get("token");
  const available = state['login_register'].get('available');

  return {open, isLogin, isRegister, userDetails, token, available};
};

function mapDispatchToProps(dispatch) {
    console.log('dispatch');
    return({
        openWindow: (isRegister, isLogin) => {dispatch(openRegisterWindow(isRegister, isLogin))},
        formChange: (e) => {dispatch(formChangeAction(e.target.id, e.target.value))},
        checkAvailability: (username) => {dispatch(checkUsernameAction(username))},
        register: (userDetails) =>{dispatch(registerAction(userDetails))},
        login: (userDetails) => {dispatch(logIn(userDetails))},
        logout: (token) => {dispatch(logOut(token))},
        fileChange: (file) => {dispatch(fileChangeAction(file[0]))}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(simpleModal));

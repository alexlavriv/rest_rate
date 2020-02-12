
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CountrySelect from '../CountryAutoComplete';
import Dropzone from '../dropzone'
import './LoginRegister.scss'
import {openLoginRegisterWindow, registerAction, formChangeAction} from './actions'
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import compose from 'recompose/compose';
 /* eslint-disable no-use-before-define */

 const styles = theme => {
return (  {paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }})
}

 class SimpleModal extends React.Component {
  
   getModalStyle() {
    const top = 50 
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  render(){
    const { classes } = this.props;
    const modalStyle = this.getModalStyle();
  return (
      <div className="LoginResiter-root">
      <div className="loginResiter-link" onClick={()=> this.props.openLoginRegisterWindow(true, false)} >Login</div>
      <div >|</div>
      <div className="loginResiter-link" onClick={()=> this.props.openLoginRegisterWindow(false, true)} >Register</div> 

      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
   
          onClose= {()=> this.props.openLoginRegisterWindow(false,false)}   >   
          <div style={modalStyle} className={classes.paper} >
          <div style={this.props.isLogin?{'display':'block'}:{'display':'none'}}> 
          <form  noValidate autoComplete="off">
          <TextField  id="standard-basic" label="Login" />
          <TextField  id="standard-basic" label="Password" />
          <Button style={{'display':'block', 'float':'right'}} variant="contained" color="primary">Login</Button>
        
         </form>
          </div>
          <div style={this.props.isRegister?{'display':'block'}:{'display':'none'}}> 
               <form  noValidate autoComplete="off">
                <TextField  id="login_name" onChange = {(e)=>this.props.formChange(e)} label="Login" />
                <TextField  id="password" onChange = {(e)=>this.props.formChange(e)} label="Password" />
                <CountrySelect/>
                <Dropzone/>
                <Button onClick={()=>this.props.register(this.props.userDetails)}
                 style={{'display':'block', 'float':'right'}} variant="contained" color="primary">Register</Button>
               </form>
          </div>

             </div>
          
        </Modal>
    </div>

  );
  }
}


const mapStateToProps = state =>{
  console.log("The state of login register is:")
  console.log(state["login_register"].get("isOpenned"))
  const isLogin = state["login_register"].get("isOpenned").isLogin
  const isRegister = state["login_register"].get("isOpenned").isRegister
  const userDetails = state["login_register"].get("user")
  const open = isLogin || isRegister


  return {open, isLogin, isRegister, userDetails};
}

function mapDispatchToProps(dispatch) {
  return({
    openLoginRegisterWindow: (isRegister,isLogin) => {dispatch(openLoginRegisterWindow(isRegister, isLogin))},
    formChange: (e) => {dispatch(formChangeAction(e.target.id, e.target.value))},
    register: (userDetails) =>{dispatch(registerAction(userDetails))}
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleModal));

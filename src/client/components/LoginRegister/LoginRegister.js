
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CountrySelect from '../CountryAutoComplete';
import Dropzone from '../dropzone'
import './LoginRegister.scss'
import {openLoginRegisterWindow} from './actions'
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import compose from 'recompose/compose';
import { LoginRegisterConstants} from './constants.js';
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
      <div className="loginResiter-link" onClick={()=> this.props.openLoginRegisterWindow(true)} >Login</div>
      <div >|</div>
      <div className="loginResiter-link" onClick={()=> this.props.openLoginRegisterWindow(false)} >Register</div> 

      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
   
          onClose= {()=> this.props.openLoginRegisterWindow(false)}   >   
          <div style={modalStyle} className={classes.paper} > xtestisOpenned</div>
          
        </Modal>
    </div>


  
    //     <div style={hide===false?{'display':'block'}:{'display':'none'}}> 
    //     <form  noValidate autoComplete="off">
    //       <TextField  id="standard-basic" label="Login" />
    //       <TextField  id="standard-basic" label="Password" />
    //       <Button style={{'display':'block', 'float':'right'}} variant="contained" color="primary">Login</Button>
        
    //     </form>
    //     </div>
    //     <div style={hide===false?{'display':'none'}:{'display':'block'}}> Register
    //     <form  noValidate autoComplete="off">
    //       <TextField  id="standard-basic" label="Login" />
    //       <TextField  id="standard-basic" label="Password" />
    //       <CountrySelect/>
    //       <Dropzone/>
    //       <Button style={{'display':'block', 'float':'right'}} variant="contained" color="primary">Register</Button>
    //     </form>
    //     </div>
    //     </div>
    //   </Modal>
    // </div>
  );
  }
}


const mapStateToProps = state =>{
  console.log("The state of login register is:")
  console.log(state["login_register"].get("isOpenned"))

  return {open: state["login_register"].get("isOpenned")};
}

function mapDispatchToProps(dispatch) {
  return({
    openLoginRegisterWindow: (isopen) => {dispatch(openLoginRegisterWindow(isopen))}
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleModal));

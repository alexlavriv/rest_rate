
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginRegister.scss'
 /* eslint-disable no-use-before-define */
import './LoginRegister.scss'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 300,
    height:200,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [hide, setHide] = React.useState(false);

  const handleOpenRegister = () => {
    console.log("handleOpenRegister");
    setHide(true);
    setOpen(true);
  };
  const handleOpenLogin = () => {
    console.log("handleOpenLogin");
    setHide(false);
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };



  return (
    <div>
      <div className="LoginResiter-root">
      <div className="loginResiter-link" onClick={handleOpenLogin}>Login</div>
      <div >|</div>
      <div className="loginResiter-link" onClick={handleOpenRegister}>Register</div> </div>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
        <div style={hide===false?{'display':'block'}:{'display':'none'}}> 
        <form  noValidate autoComplete="off">
          <TextField classes="loginRegister-inputs" id="standard-basic" label="Login" />
          <TextField classes="loginRegister-inputs" id="standard-basic" label="Password" />
          <Button style={{'display':'block', 'float':'right'}} variant="contained" color="primary">Login</Button>
        
        </form>
        </div>
        <div style={hide===false?{'display':'none'}:{'display':'block'}}> Register</div>
        <div></div>
        </div>
      </Modal>
    </div>
  );
}

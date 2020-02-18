import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';

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
        return (<div>
            <h2> I am ShowEditUser</h2>


        </div>)
    }
}

const mapStateToprops = state =>{
   
    return {};
  };
  
  function mapDispatchToprops(dispatch) {

      return({
        
      });
  }
  
  export default connect(mapStateToprops, mapDispatchToprops)(withStyles(styles)(ShowEditUser));
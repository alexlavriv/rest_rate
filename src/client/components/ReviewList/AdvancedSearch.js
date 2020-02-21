import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import "./AdvancedSearch.scss"
import {AdvancedSearchActions} from "./actions";





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


class AdvancedSearch extends React.Component{
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
            <div className="AdvancedSearch-root">
                <div className="link-style" onClick={() => this.props.advanced_search_click(true)}>Advanced Search</div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.show}
                   >
                    <div style={modalStyle} className={classes.paper} >
                            Search
                    </div>
                </Modal>
                </div>
        );
    }
}



const mapStateToProps = state =>{
    const show = state["review_list"].get("show_advanced_search");
    return {show};
  };
  
  
  function mapDispatchToProps(dispatch) {
      return({
            advanced_search_click: (show) => {dispatch(AdvancedSearchActions.showAdvancedSearchAction(show) )}
          });
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdvancedSearch));
  
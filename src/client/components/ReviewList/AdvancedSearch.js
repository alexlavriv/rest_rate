import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import "./AdvancedSearch.scss"
import {AdvancedSearchActions, SearchBarActions} from "./actions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";




const styles = theme => {
    return ({
        paper: {
            position: 'absolute',
            width: 350,
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
                <div className="link-style" onClick={() => {console.log("I was clicked");this.props.advanced_search_click(true)}}>Advanced Search</div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.show}
                    onClose={()=> this.props.advanced_search_click(false)}
                   >
                    <div style={modalStyle} className={classes.paper} >
                        <form>
                        <TextField fullWidth margin="normal" onChange={({target})=>this.props.change(target.id, target.value)}   id="rest_name"  label="Restaurant Name" />
                          <div className="AdvancedSearch-rating">
                                <div className="AdvancedSearch-text" ><Typography component="legend">Avarage Score:</Typography></div>
                                <div className="AdvancedSearch-stars"><Rating id="avg_rating" onChange={(e,value)=>this.props.change(e.target.name,value)}  name="avg_score"  /> </div>
                              </div>
                              <Button onClick={()=> {this.props.search(this.props.query); this.props.advanced_search_click(false)}} variant="contained" color="primary" style={{float:"right"}}> Search</Button>
                        </form>

                    </div>
                </Modal>
                </div>
        );
    }
}



const mapStateToProps = state =>{
    const query = state["review_list"].get("advanced_search_form");
    const show = state["review_list"].get("show_advanced_search");
    return {show, query};
  };
  
  
  function mapDispatchToProps(dispatch) {
      return({
            advanced_search_click: (show) => {dispatch(AdvancedSearchActions.showAdvancedSearchAction(show) )},
            change:(id, value) => {dispatch(AdvancedSearchActions.changeAdvancedSearchAction(id, value))},
            search:({rest_name, avg_score}) =>{dispatch(SearchBarActions.GetQueryAction({rest_name, 'avg_rating': { $gt: avg_score }}))}
          });
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdvancedSearch));
  
/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SearchBarActions} from './actions'
import {connect} from 'react-redux';
import './SearchBar.scss'

class  SearchBar extends React.Component {

  componentDidMount(){
    this.props.getRestNames();
}
render(){
  return (
      <div className="searchbar-root">
        <div style={{ width: 500 }}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                onChange={(e,value) => this.props.performQuery(e,value)}
                options={this.props.rest_names}
                renderInput={params => (
                <TextField
                    {...params}
                    onChange={(e,value) => this.props.performQuery(e,value)}
                    label="Search input"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
                )}
            />
            </div>
    </div>
  )};
}


const mapStateToProps = state => {
    const rest_names = state["review_list"].get("rest_names");
    return {rest_names};
};

function mapDispatchToProps(dispatch) {

  return({
        performQuery:(e, value)=> {console.log("###############", value) || value===''? dispatch(SearchBarActions.GetQueryAction({}, false)):dispatch(SearchBarActions.GetQueryAction({'rest_name':value}, false))},
        getRestNames: () => {dispatch(SearchBarActions.GetRestNamesAction())}
  });
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
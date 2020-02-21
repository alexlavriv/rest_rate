
 /* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {SearchBarActions} from './actions'
import { connect } from 'react-redux';
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
                onChange={(e,value) => this.props.performQeury(e,value)}
                options={this.props.rest_names}
                renderInput={params => (
                <TextField
                    {...params}
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
 const rest_names = state["review_list"].get("rest_names");;
console.log("MapstateProps", rest_names)
  return {rest_names};
};

function mapDispatchToProps(dispatch) {

  return({

    performQeury:(e,value)=> {console.log("###############", value) || value===''? dispatch(SearchBarActions.GetQueryAction({})):dispatch(SearchBarActions.GetQueryAction({'rest_name':value}))},
   getRestNames: () => {dispatch(SearchBarActions.GetRestNamesAction())}
  });
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

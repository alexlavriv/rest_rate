import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import countries from './countries'
import { render } from 'enzyme';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {EditUserActions, LoginRegisterActions} from './actions'
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}


const styles = theme => {
  return ({option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },})
  };



class CountrySelect extends React.Component {
  
  render(){ 
    const { classes } = this.props;
  return (
    <Autocomplete
      id="country-select-demo"
      
      style={{ width: 300 }}
      options={countries}
      classes={{
        option: classes.option,
      }}

      onChange={(e,value) => {this.props.locationChange(value.label)}}
      autoHighlight
      getOptionLabel={option => option.label}
      renderOption={option => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code})
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          fullWidth
         
          margin="normal"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )};
}



const mapStateToProps = state => {
 
  const userDetails = state["login_register"].get("user");
  return {userDetails};
};

function mapDispatchToProps(dispatch) {

  return({
    locationChange: (label) => {dispatch(LoginRegisterActions.formChangeAction('location', label))},
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CountrySelect));
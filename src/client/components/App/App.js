import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import LoginRegister from '../LoginRegister'
import {ReviewList, SearchBar, AdvancedSearch} from '../ReviewList'
import { connect } from 'react-redux';
import AppActions from './actions';
import GalleryActions from '../Gallery/actions';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import AddReview from '../AddReview'
import {SearchBarActions} from '../ReviewList/actions'

class App extends React.Component {
    componentDidMount() {
       // this.props.loadTagsEventHandler();
    }

  render() {
     
    return (
      <div className="app-root">
        <div className="app-header">
          <div >
            <div onClick={()=> this.props.loadReviews()} className="logo">
            REST RATE
            </div>
            </div>
          <div>
            <SearchBar/>
            <AdvancedSearch/>
          </div>
          <LoginRegister/>
        </div>
        <ReviewList />
        <div className="addReview-root"><AddReview /></div>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      tag: state['app'].get('tag'),
      tags: state['app'].get('tags').toArray()
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      loadReviews: () => {
        dispatch (SearchBarActions.GetQueryAction({}));
      },
    updateTagEventHandler: (e) => {
     // dispatch(AppActions.updateTagAction(e.value));
    },
    loadImagesEventHandler: (tag) => {
    //  dispatch(GalleryActions.loadImagesAction(tag))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

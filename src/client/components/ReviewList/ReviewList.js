import React from 'react';
import {connect} from 'react-redux';
import {GetReviewsAction} from './actions'
import ReviewView from '../ReviewView'
import ProfileView from "../ProfileView/ProfileView";


class ReviewList extends React.Component {
    componentDidMount(){
        this.props.getReviews();
    }
    render(){
        const reviewViews = this.props.reviews.map(current_review => {
            console.log('current review', current_review);
            return (
                <ReviewView key={current_review._id} review={current_review}/>
            );
        });

        return (
            <div>
                {reviewViews}
                <ProfileView/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    const reviews = state["review_list"].get("reviews");
    return {
        reviews
    };
};

function mapDispatchToProps(dispatch) {
    return({
        getReviews: () => {dispatch(GetReviewsAction())}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);

import React from 'react';
import {connect} from 'react-redux';
import {ReviewListActions} from './actions'
import ReviewView from './ReviewView'
import ProfileView from "./ProfileView";


class ReviewList extends React.Component {
    componentDidMount(){
        this.props.getReviews();
    }
    render(){
        const reviewViews = this.props.reviews.map(current_review => {
            return (
                <ReviewView key={current_review._id} review={current_review} user={this.props.userDetails}/>
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
    const userDetails = state["login_register"].get('user');
    const reviews = state["review_list"].get("reviews");

    return {reviews, userDetails};
};

function mapDispatchToProps(dispatch) {
    return({
        getReviews: () => {dispatch(ReviewListActions.GetReviewsAction())}
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);

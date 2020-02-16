import React from 'react';
import {connect} from 'react-redux';
import {GetReviewsAction} from './actions'
import ReviewView from '../ReviewView'


class ReviewList extends React.Component {
    componentDidMount(){
        console.log("ReviewList mount");
        this.props.getReviews();
    }
    render(){
        console.log(this.props.reviews);
        const reviewViews = this.props.reviews.map(current_review => {
            return (
                <ReviewView key={current_review._id} review={current_review}/>
            );
        });

        return (
            <div>
                {reviewViews}
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

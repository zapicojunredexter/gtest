import ResponderReviewAction from '../reducers/responder.review/responder.review.action';

class ResponderReviewService {
    fetchReviews = () => async (dispatch) => {
        const reviews = [
            {
                description : 'sample description',
                stars : 2,
            },
            {
                description : 'sample description',
                stars : 4,
            },
            {
                description : 'sample description',
                stars : 5,
            },
        ];
        dispatch(ResponderReviewAction.setReviews(reviews));
    };

}

export default new ResponderReviewService();

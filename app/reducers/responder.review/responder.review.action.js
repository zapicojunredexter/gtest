export const SET_REVIEWS = 'SET_REVIEWS';

class ReviewActions {
    setReviews = (reviews) => (dispatch) =>
        dispatch({
            type: SET_REVIEWS,
            reviews,
        });
}
export default new ReviewActions();

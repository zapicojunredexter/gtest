import {
    SET_REVIEWS,
} from './responder.review.action';

const initialState = {
    reviews : [],
};
class ReviewReducer {
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_REVIEWS: {
                return {...state , reviews : action.reviews };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ReviewReducer();

import {
    SET_ROUTES,
} from './routes.action';

class RoutesReducer {
    reducer = (state = [], action ) => {
        switch (action.type) {
            case SET_ROUTES: {
                return action.routes;
            }
            default: {
                return state;
            }
        }
    };
}

export default new RoutesReducer();

export const SET_ROUTES = 'SET_ROUTES';

class RoutesAction {
    setRoutes = routes => dispatch => 
        dispatch({
            type : SET_ROUTES,
            routes
        });

}

export default new RoutesAction();

import firebase from 'react-native-firebase';
import RoutesActions from '../reducers/routes/routes.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import { API_URL } from '../constants/api';
class RoutesService {
    listenRoutes = () => async (dispatch, getState) => {
        const firebaseRef = new CollectionInfrastructure(firebase,'Routes');
        firebaseRef.listen(routes => {
            dispatch(RoutesActions.setRoutes(routes));
        });
    }

    fetchRouteScheduleDates = (routeId) => async () => {
        try {
            const result = await fetch(`${API_URL}/trips/schedules/${routeId}`);
            const jsonRes = await result.json();

            return jsonRes;
        } catch(error) {
            console.error(error);
        }
    }
}

export default new RoutesService();

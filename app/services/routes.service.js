import firebase from 'react-native-firebase';
import RoutesActions from '../reducers/routes/routes.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import { API_URL } from '../constants/api';
import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';

class RoutesService {
    listenRoutes = () => async (dispatch, getState) => {
        const firebaseRef = new CollectionInfrastructure(firebase,'Routes');
        firebaseRef.listen(routes => {
            dispatch(RoutesActions.setRoutes(routes));
        });
    }

    fetchRoutes = () => async (dispatch, getState) => {
        try{
            const result = await RequestService.get(`routes`);
            const jsonResult = await responseToJson(result);
            dispatch(RoutesActions.setRoutes(jsonResult));
            return jsonResult;
        }catch(error){
            console.error(error);
        }
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

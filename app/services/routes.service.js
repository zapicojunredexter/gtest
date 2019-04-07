import firebase from 'react-native-firebase';
import RoutesActions from '../reducers/routes/routes.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class RoutesService {
    listenRoutes = () => async (dispatch, getState) => {
        const firebaseRef = new CollectionInfrastructure(firebase,'Routes');
        firebaseRef.listen(routes => {
            dispatch(RoutesActions.setRoutes(routes));
        });
    }
}

export default new RoutesService();

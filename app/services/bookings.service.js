import firebase from 'react-native-firebase';
import RoutesActions from '../reducers/routes/routes.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class RoutesService {
    addBooking = (bookingDetails) => async (dispatch, getState) => {
        // TODO should be call to api
        const userId = getState().user.Id;
        const firebaseRef = new CollectionInfrastructure(firebase,'Bookings');
        const toBeAdded = {
            ...bookingDetails,
            CommuterId : userId,
        }
        await firebaseRef.create(toBeAdded);
    }
}

export default new RoutesService();

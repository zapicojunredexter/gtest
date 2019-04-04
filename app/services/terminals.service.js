import firebase from 'react-native-firebase';
import TerminalsActions from '../reducers/terminals/terminals.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

const firebaseRef = new CollectionInfrastructure(firebase,'Terminals');

class TerminalsService {
    listenTerminals = () => async (dispatch, getState) => {

        firebaseRef.listen(terminals => {
            alert("Terminals updated");
            dispatch(TerminalsActions.setTerminals(terminals));
        });
        /*
        const terminals = [
            {
                test: "test terminal",
                testa: "testa terminal",
            },
            {
                test: "test terminal",
                testa: "testa terminal",
            },
        ];
        dispatch(TerminalsActions.setTerminals(terminals));
        */
    }
}

export default new TerminalsService();

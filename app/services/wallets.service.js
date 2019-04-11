import firebase from 'react-native-firebase';
import WalletsAction from '../reducers/wallets/wallet.action';

class WalletsService {
    fetchWalletsHistory = () => async (dispatch, getState) => {
        const { user } = getState();

        const docs = firebase.firestore()
            .collection('Wallets')
            .where("User","==",user.Id);
        const res = await docs.get();
        const history = res.docs.map(obj => obj.data());

        dispatch(WalletsAction.setWalletHistory(history));
    }
}

export default new WalletsService();

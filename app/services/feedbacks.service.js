import firebase from 'react-native-firebase';
import WalletsAction from '../reducers/wallets/wallet.action';

import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';

class WalletsService {
    fetchDriverFeedbacks = (userId) => async (dispatch, getState) => {
        
        try{
            const result = await RequestService.get(`feedbacks/${userId}`);
            const jsonResult = await responseToJson(result);
            return jsonResult;
        }catch(error){
            console.error(error);
        }
    }
}

export default new WalletsService();

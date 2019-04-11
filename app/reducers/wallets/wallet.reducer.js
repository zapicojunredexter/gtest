import {
    SET_WALLET_HISTORY,
} from './wallet.action';

class WalletReducer {
    reducer = (state = {
        walletHistory : [],
    }, action ) => {
        switch (action.type) {
            case SET_WALLET_HISTORY: {
                return {
                    ...state,
                    walletHistory: action.walletHistory
                };
            }
            default: {
                return state;
            }
        }
    };
}

export default new WalletReducer();

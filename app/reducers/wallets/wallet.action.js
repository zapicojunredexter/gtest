export const SET_WALLET_HISTORY = 'SET_WALLET_HISTORY';

class WalletAction {
    setWalletHistory = walletHistory => dispatch => 
        dispatch({
            type : SET_WALLET_HISTORY,
            walletHistory
        });
}

export default new WalletAction();

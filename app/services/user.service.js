import UserAction from '../reducers/user/user.action';

class UserService {
    login = (newUser) => (dispatch, getState) => {
        const state = getState();
        // console.log('HOOOOY', user);
        const { api } = state.system;
        
        const loggedInUser = {

            ...newUser,
            fname : 'junre',
            mname : 'yutico',
            lname : 'zapico',
            phone : '1234',
            email : 'email@yahoo.com',


            address : 'cebu',
            birthdate : '01-01-01',
            gender : 'male',
        }

        dispatch(UserAction.setNewUser(loggedInUser));
    };

    register = (params) => dispatch => {
        alert('ara sha o' + JSON.stringify(params));
    }

    updateUser = (params) => dispatch => {
        alert(JSON.stringify(params));
    }

}

export default new UserService();

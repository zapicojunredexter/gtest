import UserAction from '../reducers/user/user.action';

class UserService {
    login = (newUser) => (dispatch) => {
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

    updateUser = (params) => dispatch => {
        alert(JSON.stringify(params));
    }

}

export default new UserService();

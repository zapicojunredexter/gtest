import UserAction from '../reducers/user/user.action';

class UserService {
    login = (newUser) => async (dispatch, getState) => {
        const state = getState();
        // console.log('HOOOOY', user);
        const { api } = state.system;
        
        // const loggedInUser = {

        //     ...newUser,
        //     fname : 'junre',
        //     mname : 'yutico',
        //     lname : 'zapico',
        //     phone : '1234',
        //     email : 'email@yahoo.com',


        //     address : 'cebu',
        //     birthdate : '01-01-01',
        //     gender : 'male',
        //     type : 'seculacer',
        // }

        // dispatch(UserAction.setNewUser(loggedInUser));
        // return Promise.resolve(loggedInUser);

        const formData = new FormData();
        for(let key in newUser){
            formData.append(key, newUser[key]);
        }
        console.log('HOY',newUser);
        const response = await fetch(`${api}/login.php`,{
            method : 'post',
            body : formData,
        }).catch(error => { throw error});
        const responseText = await response.text().catch(error => { throw error });
        
        console.log('HOY',responseText);
        try {
            const data = JSON.parse(responseText);
            console.log('HOY',data);
            
            if(data.Message) { return Promise.reject(new Error(data.Message)) }
            dispatch(UserAction.setNewUser(data));
            return Promise.resolve(data);
        } catch(err) {
            throw new Error('Invalid response format');
        }
    };

    register = (params) => async (dispatch, getState) => {
        const state = getState();
        const { api } = state.system;
        const formData = new FormData();
        
        formData.append('fname', params['fname'] || '');
        formData.append('lname', params['lname'] || '');
        formData.append('sec_mname', params['mname'] || '');
        formData.append('birthdate', params['birthdate'] || '');
        formData.append('sec_gender', params['gender'] || '');
        formData.append('phone', params['phone'] || '');
        formData.append('address', params['address'] || '');
        formData.append('sec_email', params['email'] || '');
        formData.append('sec_username', params['username'] || '');
        formData.append('sec_password', params['password'] || '');
        formData.append('sec_cpassword', params['password'] || '');
        formData.append('digit_code', params['pinCode'] || '');
        formData.append('confirm_code', params['pinCode'] || '');

        console.log('HOY',params);
        const response = await fetch(`${api}/register.php`,{
            method : 'post',
            body : formData,
        }).catch(error => { throw error});
        const responseText = await response.text().catch(error => { throw error });
        
        console.log('HOY',responseText);
        try {
            const data = JSON.parse(responseText);
            console.log('HOY',data);
            
            if(data.Message) { return Promise.reject(new Error(data.Message)) }
            return Promise.resolve(data);
        } catch(err) {
            throw new Error('Invalid response format');
        }
    }

    updateUser = (params) => dispatch => {
        alert(JSON.stringify(params));
    }

}

export default new UserService();

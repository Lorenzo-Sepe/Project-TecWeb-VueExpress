import Api,{APIv1} from './api';
import type { CredentialsItem } from './credential-item.type';
import type { UserItem } from './user-item.type';

export default {
    register(credentials: CredentialsItem) {
        return APIv1()
            .post('signup', credentials)
            .then((response) => response.data);
    },
    login(credentials: CredentialsItem) {
        return APIv1()
            .post('auth', credentials)
            .then((response) => response.data);
    },
    logout(){
        return APIv1()
        .post('reset')
        .then((response) => response.data);
    },
    updateUser(newCredentials: UserItem){
        console.log('New Credentials: ',newCredentials);
        return APIv1()
        .put('/editUser')
        .then((response) => response.data);
    }
};

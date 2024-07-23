import Api,{APIv1} from './api';
import type { CredentialsItem } from './credential-item.type';

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
    canUserModifyIdea(userMail: string, token: string) {
        return APIv1()
            .post('auth', { userMail, token })
            .then((response) => response.data);
    },
};

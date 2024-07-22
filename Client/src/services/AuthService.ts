import Api from './api';
import type { CredentialsItem } from './credential-item.type';

export default {
    register(credentials: CredentialsItem) {
        return Api()
            .post('signup', credentials)
            .then((response) => response.data);
    },
    login(credentials: CredentialsItem) {
        return Api()
            .post('auth', credentials)
            .then((response) => response.data);
    },
    canUserModifyIdea(userMail: string, token: string) {
        return Api()
            .post('auth', { userMail, token })
            .then((response) => response.data);
    },
};

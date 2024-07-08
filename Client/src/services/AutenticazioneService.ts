import Api from './api';

export default {
    register(credentials: { email: string; password: string }) {
        return Api().post('register', credentials);
    }
};

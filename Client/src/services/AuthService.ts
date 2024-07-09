import Api from './api';

export default {
    register(credentials: {user:string; email: string; password: string }) {
        return Api().post('signup', credentials);
    },
    login(credentials: {user:string;email: string; password: string }) {
        return Api().post('auth', credentials);
    }
};

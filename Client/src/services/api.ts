import axios from 'axios';
import A from 'axios-observable';
import { useUserStore} from '../stores/userStore';

export const APIv1 = () => {
    const userInstance = useUserStore();
    axios.defaults.headers.common['Authorization'] = `${userInstance.user.token}`;
    return axios.create({
        baseURL: 'http://localhost:3000/',
    });
};

export default () => {
    const userInstance = useUserStore();
    A.defaults.headers.common['Authorization'] = `${userInstance.user.token}`;
    return A.create({
        baseURL: 'http://localhost:3000/',
    });
};

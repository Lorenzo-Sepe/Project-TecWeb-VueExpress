import axios from 'axios';
import { useUserStore} from '../stores/userStore';

export default () => {
    const userInstance = useUserStore();
    axios.defaults.headers.common['Authorization'] = `${userInstance.user.token}`;
    return axios.create({
        baseURL: 'http://localhost:3000/',
    });
};

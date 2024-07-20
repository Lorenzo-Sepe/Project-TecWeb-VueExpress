import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user= ref({
            userName: '',
            userMail: '',
            password: '',
            token: '0',
        });
        function updateUser(newData: {userName?: string, userMail?: string, password?: string, token?: string}){
                user.value={...user.value, ...newData};
            }

        function setUser(newData: {userName?: string, userMail?: string, password?: string, token?: string}){
                user.value={
                    userName: newData.userName ?? '',
                    userMail: newData.userMail ?? '',
                    password: newData.password ?? '',
                    token: newData.token ?? '',
                };
            }
    return {
        user,
        updateUser,
        setUser
    };
},{persist: true});

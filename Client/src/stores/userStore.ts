import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore(
    'user',
    () => {
        const user = ref({
            userName: '',
            userMail: '',
            password: '',
            token: '',
            votedOn: [] as string[],
        });
        function updateUser(newData: {
            userName?: string;
            userMail?: string;
            password?: string;
            token?: string;
            votedOn?: string[];
        }) {
            user.value = { ...user.value, ...newData };
        }

        function setUser(newData: {
            userName?: string;
            userMail?: string;
            password?: string;
            token?: string;
            votedOn?: string[];
        }) {
            user.value = {
                userName: newData.userName ?? '',
                userMail: newData.userMail ?? '',
                password: newData.password ?? '',
                token: newData.token ?? '',
                votedOn: newData.votedOn ?? [],
            };
        }

        function getUser() {
            return user.value;
        }
        return {
            user,
            updateUser,
            setUser,
            getUser,
        };
    },
    { persist: true }
);

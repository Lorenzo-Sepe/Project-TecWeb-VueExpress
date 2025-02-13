import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIdeaStore = defineStore(
    'idea',
    () => {
        const idea = ref({
            id: '',
            title: '',
            content: '',
            upvotes: 0,
            downvotes: 0,
            userMail: '',
        });

        function setIdea(   
            newIdea:{
                id: string,
                title: string,
                content: string,
                upvotes: number,
                downvotes: number,
                userMail: string,
            }
        ) {
            idea.value = newIdea
        }

        function updateIdea(newData: {
            title?: string;
            content?: string;
            upvotes?: number;
            downvotes?: number;
            userMail?: string;
        }) {
            idea.value = { ...idea.value, ...newData };
        }

        function clearIdea() {
            idea.value = {
                id: '',
                title: '',
                content: '',
                upvotes: 0,
                downvotes: 0,
                userMail: '',
            };
        }

        return {
            idea,
            updateIdea,
            setIdea,
            clearIdea,
        };
    },
    { persist: true }
);

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIdeaStore = defineStore(
    'idea',
    () => {
        const idea = ref({
            title: '',
            content: '',
            upvotes: 0,
            downvotes: 0,
            userMail: '',
        });

        function setIdea(   
            newIdea:{
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

        return {
            idea,
            updateIdea,
            setIdea,
        };
    },
    { persist: true }
);

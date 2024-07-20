import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIdeaStore = defineStore('idea', () => {
    const idea= ref({
            title: '',
            content: '',
            upvotes: 0,
            downvotes: 0,
        });
        function updateIdea(newData: {title?: string, content?: string, upvotes?: number, downvotes?: number}){
                idea.value={...idea.value, ...newData};
            }
    return {
        idea,
        updateIdea,
    };
},{persist: true});

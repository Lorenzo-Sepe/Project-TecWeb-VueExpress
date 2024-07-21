<template>
    <div>
        <IdeaCard :ideasArray="ideas" :edit="edit"/>
    </div>
</template>

<script setup lang="ts">
import IdeaCard from '../components/IdeaCardComponent.vue'
import { IdeaService } from '@/services/IdeaServices';
import { onMounted } from 'vue';
let loading: boolean = true;

onMounted(() => {
    fetchIdeas();
});

const edit:boolean = false;
const ideas = [
    {
        id: 1,
        title: 'idea 1',
        upvotes: 10,
        downvotes: 2,
        content: 'This is the content for idea 1.',
        
    },
    {
        id: 2,
        title: 'idea 2',
        upvotes: 7,
        downvotes: 1,
        content: 'This is the content for idea 2.',
        
    },
    {
        id: 3,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
];

async function fetchIdeas() {
    loading = true;
    try {
        const response = await IdeaService.getIdeas();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
</script>



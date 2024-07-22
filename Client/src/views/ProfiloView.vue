<template>
    <div class="grid-container">
        
            <ProfiloInfo class="profilo"/>
            <div class="idee">
            <IdeePersonali  :ideasArray="ideas" :edit="edit" />
            <v-pagination  v-model="currentPage" :length="lunghezzaLista"></v-pagination>
            </div>
    </div>
</template>

<script setup lang="ts">
import ProfiloInfo from '../components/ProfiloInfo.vue';
import IdeePersonali from '../components/IdeaCardComponent.vue';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';

const currentPage = ref(1);
const pageSize = 10;


const userInstance = useUserStore();
const edit: boolean = true;
const ideas = [
    {
        id: 1,
        title: 'idea 1',
        upvotes: 10,
        downvotes: 2,
        content: 'This is the content for idea 1.',
        userMail: userInstance.user.userMail,
    },
    {
        id: 2,
        title: 'idea 2',
        upvotes: 7,
        downvotes: 1,
        content: 'This is the content for idea 2.',
        userMail: userInstance.user.userMail,
    },
    {
        id: 3,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: userInstance.user.userMail,
    },
];

let arrotondamento = ideas.length + (pageSize - (ideas.length % pageSize));
let lunghezzaLista = arrotondamento / pageSize;
lunghezzaLista = Math.floor(lunghezzaLista);
</script>

<style scoped>
.grid-container {
    padding: 1rem;
  display: grid;
  height: 100vh;
  gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
    "profilo idee"
    "empty idee"
    "empty idee";
    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
        grid-template-areas: 
        "profilo"
        "pagination"
        "idee";
        
    }
}

.profilo {
    grid-area: profilo;
}

.idee {
    grid-area: idee;
}


</style>

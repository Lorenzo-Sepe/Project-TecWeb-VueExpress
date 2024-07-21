<template>
    <div class="container">
        <v-pagination v-model=currentPage :length=lunghezzaLista></v-pagination>
        <IdeaCard :ideasArray="visibleIdeas" :edit="edit" class="cardsSize"/>
        <v-pagination v-model=currentPage :length=lunghezzaLista></v-pagination>
    </div>
</template>

<script setup lang="ts">
import IdeaCard from '../components/IdeaCardComponent.vue'
import { IdeaService } from '@/services/IdeaServices';
import { onMounted,computed ,ref} from 'vue';

let loading: boolean = true;

const  props = defineProps({
    ordinamento: String,
})

 /* onMounted(() => {
    fetchIdeas();
});  */

const currentPage = ref(1);
const pageSize = 10;
const start = (currentPage.value - 1) * pageSize
const end = (start + pageSize)-1;


const visibleIdeas = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = (start + pageSize);
    return ideas.slice(start, end);
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
    {
        id: 4,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
    {
        id: 5,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
    {
        id: 6,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
    {
        id: 7,
        title: 'idea 1',
        upvotes: 10,
        downvotes: 2,
        content: 'This is the content for idea 1.',
        
    },
    {
        id: 8,
        title: 'idea 2',
        upvotes: 7,
        downvotes: 1,
        content: 'This is the content for idea 2.',
        
    },
    {
        id: 9,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
    {
        id: 10,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
    {
        id: 11,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
    {
        id: 12,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        
    },
];

// TODO far funzionare le API REST
async function fetchIdeas() {
    loading = true;
    try {
        const response = await IdeaService.getIdeas();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

let arrotondamento = (ideas.length) + (pageSize - (ideas.length % pageSize));
let lunghezzaLista = ((arrotondamento)/pageSize);
lunghezzaLista = Math.floor(lunghezzaLista);
</script>

<style scoped>
div.container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}
.cardsSize{
    display: flex;
    flex-grow: true;
    width: 100%;
}

</style>
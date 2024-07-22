<template>
    <div v-if="loading" class="tw-p-3 tw-gap-2">
        <v-skeleton-loader type="card"></v-skeleton-loader>
        <v-skeleton-loader type="card"></v-skeleton-loader>
        <v-skeleton-loader type="card"></v-skeleton-loader>
    </div>

    <div class="container" v-else>
        <v-pagination v-model="currentPage" :length="lunghezzaLista"></v-pagination>
        <IdeaCard :ideasArray="sortedIdeas" :edit="edit" class="cardsSize" />
        <v-pagination v-model="currentPage" :length="lunghezzaLista"></v-pagination>
    </div>
</template>

<script setup lang="ts">
import IdeaCard from '../components/IdeaCardComponent.vue';
import { IdeaService } from '@/services/IdeaServices';
import { onMounted, computed, ref } from 'vue';

let loading=ref(false);

const props = defineProps({
    ordinamento: String,
});

onMounted(() => {
    //fetchIdeas();
    switch(props.ordinamento) {
        case 'popolari':
            ideas.sort((a, b) => b.upvotes - a.upvotes);
            break;
        case 'sfavorite':
            ideas.sort((a, b) => b.downvotes - a.downvotes);
            break;
        case 'controverse':
            ideas.sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes));
            break;
        default:
            ideas.sort((a, b) => b.id - a.id);
            break;
    }
}); 

const currentPage = ref(1);
const pageSize = 10;
const start = (currentPage.value - 1) * pageSize;
const end = start + pageSize - 1;

const visibleIdeas = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return ideas.slice(start, end);
});

const sortedIdeas = computed(()=>{
    let ris = [];
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    switch(props.ordinamento) {
        case 'popolari':
            ris = [...ideas].sort((a, b) => b.upvotes - a.upvotes);
            return ris.slice(start, end);
            
        case 'sfavorite':
            ris = [...ideas].sort((a, b) => b.downvotes - a.downvotes);
            return ris.slice(start, end);
            
        case 'controverse':
            //ris = [...ideas].sort((a, b) => (b.upvotes / b.downvotes) - (a.upvotes / a.downvotes));
            ris = [...ideas].sort((a, b) => {
                const ratioA = a.upvotes / a.downvotes;
                const ratioB = b.upvotes / b.downvotes;
                return Math.abs(ratioA - 0) - Math.abs(ratioB - 0);
            });
            return ris.slice(start, end);
           
        default:
            ris = [...ideas].sort((a, b) => b.id - a.id);
            return ris.slice(start, end);
            
    }
}
)

const edit: boolean = false;
const ideas = [
    {
        id: 1,
        title: 'idea 1',
        upvotes: 10,
        downvotes: 2,
        content: 'This is the content for idea 1.',
        userMail: 'emily.brookshire@fakemail.com'
    },
    {
        id: 2,
        title: 'idea 2',
        upvotes: 7,
        downvotes: 1,
        content: 'This is the content for idea 2.',
        userMail: 'sophia.rivers@fauxemail.io'
    },
    {
        id: 3,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'hannah.summers@pretendmail.org'
    },
    {
        id: 4,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'marcus.davison@bogusmail.co'
    },
    {
        id: 5,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'hannah.summers@pretendmail.org'
    },
    {
        id: 6,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'jackson.tyler@madeupmail.net'
    },
    {
        id: 7,
        title: 'idea 1',
        upvotes: 10,
        downvotes: 2,
        content: 'This is the content for idea 1.',
        userMail: 'jackson.tyler@madeupmail.net'
    },
    {
        id: 8,
        title: 'idea 2',
        upvotes: 7,
        downvotes: 1,
        content: 'This is the content for idea 2.',
        userMail: 'marcus.davison@bogusmail.co'
    },
    {
        id: 9,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'emily.brookshire@fakemail.com'
    },
    {
        id: 10,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'hannah.summers@pretendmail.org'
    },
    {
        id: 11,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'marcus.davison@bogusmail.co'
    },
    {
        id: 12,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        content: 'This is the content for idea 3.',
        userMail: 'emily.brookshire@fakemail.com'
    },
];

// TODO far funzionare le API REST
async function fetchIdeas() {
    loading.value = true;
    try {
        const response = await IdeaService.getIdeas();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}



let arrotondamento = ideas.length + (pageSize - (ideas.length % pageSize));
let lunghezzaLista = arrotondamento / pageSize;
lunghezzaLista = Math.floor(lunghezzaLista);
</script>

<style scoped>
div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}
.cardsSize {
    display: flex;
    flex-grow: true;
    width: 100%;
}
</style>

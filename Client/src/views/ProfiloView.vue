<template>
    <div >
        <div class="profile">
        <div class="info">
            <ProfiloInfo/>
        </div>
        <div class="idee">
            <IdeePersonali :ideasArray="ideas" :edit="edit"/>
        </div>
        
        </div>

    </div> 

        
</template>

<script setup lang="ts">
import ProfiloInfo from '../components/ProfiloInfo.vue'
import IdeePersonali from '../components/IdeaCardComponent.vue'


const edit:boolean = true;
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

</script>

<style scoped>
.idee{
    @media screen and (max-width: 900px) {
        width: 100%;
        
    }
    @media screen and (min-width: 900px) {
        width: 50%;
    }
}

.profile {
    display: flex;
    justify-content: left;
    padding: 1rem;
    @media screen and (max-width: 900px) {
        flex-direction: column;
        
    }
    @media screen and (min-width: 900px) {
        flex-direction: row;  
    }
    
}

.info{
    @media screen and (max-width: 900px) {
        width: 100%;
    }
    @media screen and (min-width: 900px) {
        width: 50%;
    }
}
</style>

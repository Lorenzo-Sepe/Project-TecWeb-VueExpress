<template>
    <div class="idea-view">
        <v-container>
            <div class="idea-container">
            <div class="idea-title">{{ idea.title }}</div>
            <div class="idea-content" v-html="idea.content"></div>

            <br>
            <div class="vote-actions">
                <v-btn 
                variant="outlined" 
                size="x-large" 
                prepend-icon="mdi-arrow-up-bold-hexagon-outline" 
                @click="upvote" 
                :disabled="voted"
                color="success">
                    Upvote
                    <v-chip 
                        density="confortable" 
                        size="x-large" 
                        class="vote-count">
                        {{ upvotes }}
                    </v-chip>
                </v-btn>
                
                <v-btn
                :disabled="voted"
                 variant="outlined" 
                 outline size="x-large" 
                 prepend-icon="mdi-arrow-down-bold-hexagon-outline" 
                 @click="downvote" 
                 color="error">
                    Downvote
                    <v-chip 
                        density="confortable" 
                        size="x-large" 
                        class="vote-count">
                        {{ downvotes }}
                    </v-chip>
                </v-btn>
            </div>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref ,onUpdated} from 'vue';
import {IdeaService} from '../services/IdeaServices.ts';

let voted = ref(false);

const idea = {
    title: 'Sample idea',
    content: '<h1>Lorem</h1> ipsum dolor sit amet, consectetur adipiscing elit.',
    upvotes: 0,
    downvotes: 0
};

const upvotes = ref(0);
const downvotes = ref(0);

const upvote = () => {
    voted.value = true;
    upvotes.value++; };

const downvote = () => {    
    voted.value = true;
    downvotes.value++; };

async function updateIdea(){
    await IdeaService.updateIdea({
        upvotes: upvotes.value,
        downvotes: downvotes.value,
    });
}

onUpdated(() => {
    updateIdea();
});

</script>

<style scoped>
.idea-view {
    display: flex;
    
    height: 100vh;
}

.idea-title {
    font-size: 24px;
    font-weight: bold;
    background-color: #005676;
    color: #f9b63c;
    padding: 0.5rem;
    margin-left: 0;
    margin-right: 0;
}

.idea-content {
    margin-top: 16px;
}

.vote-count {
    margin: 0 8px;
}
.vote-actions {
    display: flex;
    gap: 16px;
    margin-top: 16px;
}

br {
    margin: 0 8px;
    color: #005676;
}
</style>


<template>
    <div class="idea-view">
        <v-container>
            <div class="idea-container">
                <div class="idea-title">{{ idea.title }}</div>
                <div class="idea-content" v-html="idea.content"></div>

                <br />
                <div class="vote-actions">
                    <v-btn
                        variant="outlined"
                        size="large"
                        prepend-icon="mdi-arrow-up-bold-hexagon-outline"
                        @click="upvote"
                        :disabled="voted"
                        color="success"
                    >
                        Upvote
                        <v-chip density="comfortable" size="large" class="vote-count">
                            {{ idea.upvotes }}
                        </v-chip>
                    </v-btn>

                    <v-btn
                        :disabled="voted"
                        variant="outlined"
                        outline
                        size="large"
                        prepend-icon="mdi-arrow-down-bold-hexagon-outline"
                        @click="downvote"
                        color="error"
                    >
                        Downvote
                        <v-chip density="comfortable" size="large" class="vote-count">
                            {{ idea.downvotes }}
                        </v-chip>
                    </v-btn>
                </div>
                <div class="escape" style="padding-top: 2rem;">
                    <v-btn @click="router.push('/')" color="#005676" size="x-large"><span style="color: #f9b63c;">Torna alla Home</span></v-btn>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import { IdeaService } from '../services/IdeaServices';
import { useUserStore } from '../stores/userStore';
import { useIdeaStore } from '@/stores/ideaStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const idea = useIdeaStore().idea;
let voted = ref(false);


//TODO importa idea da store

const userVoted = () => {
    voted.value = true;
    let newArray:string[] = userStore.user.votedOn;
    newArray.push(idea.id);
    userStore.updateUser({
        votedOn: newArray,
    });
};

const upvote = () => {
    userVoted();
    voted.value = true;
    idea.upvotes++;
};

const downvote = () => {
    userVoted();
    voted.value = true;
    idea.downvotes++;
};

async function updateIdea() {
    await IdeaService.updateIdea({
        id: idea.id,
        title: idea.title,
        content: idea.content,
        upvotes: idea.upvotes,
        downvotes: idea.downvotes,
        userMail: idea.userMail,
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

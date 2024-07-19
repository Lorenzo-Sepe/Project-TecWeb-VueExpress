<template>
    <div>
        <v-container>
            <v-row>
                <v-col v-for="idea in ideas" :key="idea.id" cols="12" sm="6" md="4">
                    <v-card color="#005676">
                        <template v-slot:title
                            ><span class="title">{{ idea.title }}</span></template
                        >
                        <v-card-text class="bg-surface-light pt-4">{{
                            idea.description
                        }}</v-card-text>
                        <v-card-item class="bg-surface-light pt-4">
                            <v-chip class="chip-space" prepend-icon="mdi-plus-circle">
                                {{ idea.upvotes }}
                            </v-chip>
                            <v-chip class="chip-space" prepend-icon="mdi-minus-circle">
                                {{ idea.downvotes }}
                            </v-chip>
                        </v-card-item>
                        <v-card-actions class="bg-surface-light pt-4">
                            <router-link :to="{ name: 'VisualizzaIdea', params: { id: idea.id } }">
                                <v-btn color="primary">Read More</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { IdeaService } from '@/services/IdeaServices';
import { onMounted } from 'vue';
let loading: boolean = false;
//let ideas = ref([]);

onMounted(() => {
    fetchIdeas();
});

const ideas = [
    {
        id: 1,
        title: 'idea 1',
        upvotes: 10,
        downvotes: 2,
        description: 'This is the description for idea 1.',
        image: 'https://example.com/idea1.jpg',
    },
    {
        id: 2,
        title: 'idea 2',
        upvotes: 7,
        downvotes: 1,
        description: 'This is the description for idea 2.',
        image: 'https://example.com/idea2.jpg',
    },
    {
        id: 3,
        title: 'idea 3',
        upvotes: 5,
        downvotes: 3,
        description: 'This is the description for idea 3.',
        image: 'https://example.com/idea3.jpg',
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

<style scoped>
.chip-space {
    margin-right: 10px;
}
.title {
    height: 2rem;
    color: rgb(249 182 60/1);

    background-color: rgb(0 86 118 / 1) /* #005676 */;
    font-size: 1.5rem;
    padding-left: 0.5rem;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
    font-weight: bold;
    width: 500px;
}
</style>

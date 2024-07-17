<template>
    
    <v-form v-model="valid" @submit.prevent>
        <v-container fill-height>
            <h1>Condividi la tua idea</h1>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-text-field
                        v-model="post.title"
                        label="Titolo"
                        required
                        :rules="[v => !!v || 'Il titolo è obbligatorio']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <Markdown v-model="post.content" label="Contenuto" required></Markdown>
                </v-col>
                <v-col cols="12">
                    <v-btn
                        @click="createPost"
                        :disabled="!valid"
                        color="#005676"
                        dark
                        size="x-large"
                        rounded
                        class="mt-4"
                    >
                    <span class="bottonetesto">Crea Idea</span>    
                    </v-btn>
                </v-col>
            </v-row>  
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Markdown from '../components/MarkDown.vue';

const valid = ref(false);
const post = ref({
    title: '',
    content: ''
});

const createPost = () => {
    // Logic to create the post
    // You can use the post.value.title and post.value.content values to send the data to the server
};
</script>

<style scoped>
h1 {
    color: #005676;
}
.bottonetesto {
    @apply tw-text-honey;
}
</style>

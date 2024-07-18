<template>
    
    <v-form v-model="valid" @submit.prevent>
        <v-container fill-height>
            <h1 class="intestazione">Condividi la tua idea</h1>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-text-field
                        color="#005676"
                        v-model="post.title"
                        label="Titolo"
                        required
                        :rules="[v => !!v || 'Il titolo è obbligatorio']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <h3 id="label" class="intestazione" :class="{badInput : hasError}">Contenuto</h3>
                    <Markdown v-model="post.content" label="Contenuto" required ></Markdown>
                    
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

const valid = ref(true);
const hasError = ref(false);
const post = ref({
    title: '',
    content: ''
});

const validate = () => {
    if (!post.value.title) {
        valid.value = false;
        hasError.value = true;
        alert('Il titolo è obbligatorio');
    }
    if (!post.value.content) {
        valid.value = false;
        hasError.value = true;
        alert('Il contenuto è obbligatorio');
    }
    valid.value = true;
};
const createPost = () => {
    validate();
    // Logic to create the post
    // You can use the post.value.title and post.value.content values to send the data to the server
};
</script>

<style scoped>
.intestazione {
    color: #005676;
}
.bottonetesto {
    @apply tw-text-honey;
}

.valid-input {
    color: #005676;
}
.badInput {
    color: #B00020;
    border-bottom: #B00020 1px solid;
}

.badInput::after {
    content: 'Il contenuto è obbligatorio';
    display: block;
    color: #B00020;
    font-size: 0.7rem;
}
</style>

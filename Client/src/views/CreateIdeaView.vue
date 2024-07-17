<template>
    <h1>Condividi la tua idea</h1>
    <v-form v-model="valid" @submit.prevent>
        <v-container>
            <v-row>
                <v-row cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="post.title"
                        label="Titolo"
                        required
                        :rules="[(v) => !!v || 'Il titolo è obbligatorio']"
                    ></v-text-field>

                    <v-col cols="12" md="4">
                        <Markdown
                            v-model="post.content"
                            required
                            :rules="[(v) => !!v || 'Il contenuto è obbligatorio']"
                        />
                    </v-col>
                </v-row>
            </v-row>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
</style>

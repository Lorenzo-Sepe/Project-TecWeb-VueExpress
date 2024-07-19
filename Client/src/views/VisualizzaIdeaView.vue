<template>
    <div>
        <h1>{{ idea.title }}</h1>
        <p>{{ idea.content }}</p>
        <div>
            <v-btn @click="upvote" color="success">Upvote</v-btn>
            <span>{{ upvotes }}</span>
            <span>{{ downvotes }}</span>
            <v-btn @click="downvote" color="error">Downvote</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const idea = {
    title: 'Sample idea',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const upvotes = ref(0);
const downvotes = ref(0);

const upvote = () => {
    upvotes.value++;
};

const downvote = () => {
    downvotes.value++;
};
</script>

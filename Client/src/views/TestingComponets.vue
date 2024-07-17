<template>
    <div>
        <Markdown v-model="html" />
        <button @click="sanitize">sanitize</button>
        <div v-html="clean"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import sanitizeHtml from 'sanitize-html';
import Markdown from '../components/MarkDown.vue';

const html = ref('');
const clean = ref('');

function sanitize() {
    clean.value = sanitizeHtml(html.value, {
        allowedTags: [
            'b',
            'i',
            'em',
            'strong',
            'p',
            'ul',
            'ol',
            'li',
            'code',
            'hr',
            'br',
            'span',
            'img'
        ],
        allowedAttributes: {
            img: ['src'],
            '*': ['style']
        }
    });
}
</script>

<style scoped>
.container {
    width: 100%;
}
</style>

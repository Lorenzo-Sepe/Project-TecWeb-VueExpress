<template>
    <Editor
        mode="preview"
        ref="editor"
        hint="Hint"
        :outline="false"
        :render-config="renderConfig"
        v-model="text"
    />
</template>

<script setup lang="ts">
import { Editor } from 'vuetify-markdown-editor';
import { ref } from 'vue';
const text = ref('');
const renderConfig: {
    // Mermaid config
    mermaid: {
        theme: 'dark';
    };
};
</script>

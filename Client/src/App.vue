<script setup lang="ts">
import Navbar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
import Footer from './components/FooterApp.vue';
</script>

<template>
    <Navbar />

    <RouterView />
    <Footer />
</template>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/bootstrap5.css';
</style>

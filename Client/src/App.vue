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

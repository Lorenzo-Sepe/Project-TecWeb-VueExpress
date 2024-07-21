<script setup lang="ts">
import Navbar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
import Footer from './components/FooterApp.vue';
</script>

<template>
    <Navbar />
    <div class="corpo">
        <RouterView />
    </div>

    <div class="fondoPagina">
        <Footer />
    </div>
</template>

<style scoped>
.corpo {
    min-height: 100vh;
    min-width: 100vw;
}
</style>

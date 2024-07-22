<script setup lang="ts">
import Navbar from './components/NavBar.vue';
import { RouterView } from 'vue-router';
import Footer from './components/FooterApp.vue';
</script>

<template>
    <div class="universale">
        <Navbar />
        <div class="corpo">
            <RouterView />
        </div>

        <div class="fondoPagina">
            <Footer />
        </div>
    </div>
</template>

<style scoped>
.corpo {
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    overflow-y: scroll;
}
.universale {
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    overflow-y: scroll;
}
</style>

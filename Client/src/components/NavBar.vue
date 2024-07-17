<template>
    <v-toolbar :elevation="8" color="#0b1a29">
        <RouterLink to="/" class="links">
            <img
                style="padding: 1rem"
                src="../assets/images/svg/Companylogo.svg"
                alt="logo"
                width="100"
                height="100"
            />
        </RouterLink>
        <RouterLink to="/" class="links">
            <v-toolbar-title>
                <h2 style="color: #f9b63c">Hivemind</h2>
            </v-toolbar-title>
        </RouterLink>

        <v-spacer></v-spacer>

        <RouterLink to="/about" class="links">
            <v-btn class="bottone" rounded="xl" color="#f9b63c" append-icon="mdi-account" variant="tonal">
                Profilo</v-btn>
        </RouterLink>
        <RouterLink to="/create-idea" class="links">
            <v-btn rounded="xl" append-icon="mdi-newspaper-plus" color="#f9b63c" variant="tonal">
                Crea Idea
            </v-btn>
        </RouterLink>
    </v-toolbar>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style>
.links {
    text-decoration: none;
    color: inherit;
}
.iconeSize {
    font-size: 1rem;
    font-weight: 540;
    margin-right: 1rem;
}
</style>

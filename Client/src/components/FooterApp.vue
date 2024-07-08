<template>
    <footer class="footer">
        <p>&copy; {{ currentYear }} Lorenzo Sepe</p>
        <p>Scritto in Vue 3, Vite, and Vuetify</p>
        <a href="https://github.com/Lorenzo-Sepe" target="_blank"
            ><v-icon color="#f9b63c" icon="mdi-github"></v-icon
        ></a>
    </footer>
</template>

<script lang="ts" setup>
const currentYear: number = new Date().getFullYear();
</script>

<style scoped>
.footer {
    background-color: #0b1a29;
    padding: 20px;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
.footer p {
    color: #f9b63c;
}
</style>

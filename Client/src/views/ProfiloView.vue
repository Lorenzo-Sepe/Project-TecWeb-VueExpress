<template>
    <div class="profile">
        <h1>Profile</h1>
        <div class="username">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" />
        </div>
        <div class="password">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" />
        </div>
        <button @click="updateProfile">Update Profile</button>
        <h2>Previous Posts</h2>
        <ul>
            <li v-for="post in previousPosts" :key="post.id">{{ post.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const previousPosts = ref([
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
]);

function updateProfile() {
    // Implement your logic to update the profile here
    console.log('Profile updated');
}
</script>

<style scoped>
.profile {
    max-width: 400px;
    margin: 0 auto;
}

.username,
.password {
    margin-bottom: 10px;
}

button {
    display: block;
    margin-top: 10px;
}
</style>

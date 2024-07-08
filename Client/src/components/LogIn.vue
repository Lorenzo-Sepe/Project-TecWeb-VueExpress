<template>
    <div id="areaInputs">
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" id="email" placeholder="Email" />

        <label for="password">Password</label>
        <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="password"
        />
        <br />
        <button @click="register">Log In</button>
    </div>
</template>

<script setup lang="ts">
import AutentificazioneService from '@/services/AutenticazioneService';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

async function register() {
    const response = await AutentificazioneService.register({
        email: email.value,
        password: password.value
    });
    console.log(response.data);
}
</script>

<style scoped>
#areaInputs {
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
}
label {
    color: #f9b63c;
}
button {
    border: 2px solid #005676;
    width: 20rem;
}
input {
    border: 2px solid #005676;
    width: 20rem;
}
div {
    display: flex;
    flex-direction: column;
}
</style>

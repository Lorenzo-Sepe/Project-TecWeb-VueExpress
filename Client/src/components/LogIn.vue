<template>
    <v-container>
        <div class="white elevation-2">
            <v-toolbar flat dense color="#005676">
                <v-toolbar-title class="label">Login</v-toolbar-title>
            </v-toolbar>

            <v-form v-model="form" @submit.prevent="login" class="pl-4 pr-4 pt-2 pb-2">
                <v-text-field
                    name="user"
                    label="Username"
                    class="input-group--focussed"
                    :rules="[(v) => !!v || 'Il campo è obbligatorio']"
                    v-model="credentials.user"
                    clearable
                ></v-text-field>

                <v-text-field
                    name="email"
                    label="Email"
                    class="input-group--focussed"
                    :rules="[(v) => !!v || 'Il campo è obbligatorio']"
                    v-model="credentials.email"
                    clearable
                ></v-text-field>

                <v-text-field
                    type="password"
                    name="password"
                    label="Password"
                    class="input-group--focussed"
                    :rules="passwordRules"
                    v-model="credentials.password"
                    clearable
                ></v-text-field>
                <div class="areaButtons">
                    <v-btn
                        class="bottone"
                        size="large"
                        color="#005676"
                        :disabled="!form"
                        :loading="loading"
                        type="submit"
                    >
                        <span class="label">Login</span>
                    </v-btn>
                    <v-btn
                        :disabled="!form"
                        :loading="loading"
                        class="bottone"
                        size="large"
                        color="#005676"
                        @click="register"
                    >
                        <span class="label">Registrati</span>
                    </v-btn>
                </div>
                <div v-if="err" class="err">{{ err }}</div>
                <div v-if="response" class="success">{{ response }}</div>
            </v-form>
        </div>
    </v-container>
    <div>{{ credentials.user }}</div>
</template>

<script setup lang="ts">
import AuthService from '../services/AuthService';
import {useUserStore} from '../stores/userStore.ts';
import { ref } from 'vue';

const storeInstance = useUserStore();

let passwordRules = [
    (v: any) => !!v || 'Il campo è obbligatorio',
    (v: any) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,32}$/.test(v) ||
        'La password deve essere compresa tra gli 8 e 32 caratteri e può comprendere $, !, %, *, #, ?, &',
    ];

//let submitted: boolean = false;
const form = ref(false);
let loading: boolean = false;

const credentials = ref({
    user: '',
    email: '',
    password: '',
});

let err = ref('');

async function login() {
    //submitted = true;
    try {
        const response = await AuthService.login({
            user: credentials.value.user,
            email: credentials.value.email,
            password: credentials.value.password,
        });
        console.log(response);
        storeInstance.setUser({
            user: credentials.value.user,
            email: credentials.value.email,
            password: credentials.value.password,
        })
    } catch (error: any) {
        err.value = error.response.data.error;
    }
}
async function register() {
    try {
        await AuthService.register({
            user: credentials.value.user,
            email: credentials.value.email,
            password: credentials.value.password,
        });
    } catch (error: any) {
        err.value = error.response.data.error;
    }
}
</script>

<style scoped>
.err {
    color: #b00020;
}

.success {
    color: #4caf50;
}

.label {
    font-weight: semi-bold;
    color: #f9b63c;
}
.areaButtons {
    display: flex;
    gap: 10px;
    justify-content: space-around;
    justify-items: center;
    margin-top: 10px;
    color: #f9b63c;
    width: 100%;
}
.bottone {
    width: 45%;
}
</style>

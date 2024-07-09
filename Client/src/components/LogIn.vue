<template>

    <v-layout column  >
       <v-flex >
        <div class="white elevation-2">
            <v-toolbar flat dense color="#005676" >
                <v-toolbar-title class="label">Register/Log In</v-toolbar-title>
            </v-toolbar>
                <div class="pt-2 pb-2 pl-4 pr-4">
                <v-text-field v-model="user" label="User" required></v-text-field>
                <v-text-field v-model="email" label="Email" required></v-text-field>
                <v-text-field v-model="password" label="Password" required></v-text-field>
                
                    <v-btn @click="login">Log In</v-btn>
                    <v-btn @click="register">Register</v-btn>
               
                
                <div v-html="err" class="err"></div>
                    
            </div>

            
        </div> 
       </v-flex> 
    </v-layout>    
</template>

<script setup lang="ts">
import AuthService from '@/services/AuthService';
import { ref } from 'vue';

const user =ref('');
const email = ref('');
const password = ref('');
let err = ref('');


async function login() {
    try {
        await AuthService.login({
            user: user.value,
            email: email.value,
            password: password.value
        });
    } catch (error: any) {
        err.value = error.response.data.error;
    }
}
async function register() {
   try  { 
        await AuthService.register({
        user: user.value,
        email: email.value,
        password: password.value
        });
    }catch(error:any){
       err.value = error.response.data.error;
    }
    
}
</script>

<style scoped>
.err{
    color: red;
}

.label {
    font-weight: semi-bold;
    color: #f9b63c;
}

div.areaButtons {
    display: flex;
    flex-direction: row;
}
div #container{
    width: 100%;
}
</style>@/services/AuthService

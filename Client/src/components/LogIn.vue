<template>
    <v-container>
            <div class="white elevation-2">
                <v-toolbar flat dense color="#005676" >
                    <v-toolbar-title class="label">Login</v-toolbar-title>
                </v-toolbar>

                <div class="pl-4 pr-4 pt-2 pb-2">
                    <v-text-field
                    name="user"
                    label="Username"
                    value="Username"
                    class="input-group--focussed"
                     
                    v-model="user"
                    ></v-text-field>

                    <v-text-field
                    name="email"
                    label="Email"
                    value="Email"
                    class="input-group--focussed"
                     
                    v-model="email"
                    ></v-text-field>

                    <v-text-field
                    name="password"
                    label="Password"
                    value="Password"
                    class="input-group--focussed"
                     
                    v-model="password"
                    ></v-text-field>
                    <div class="areaButtons">
                    <v-btn class="bottone" size="large" color="#005676" @click="login"><span class="label">Login</span></v-btn>
                    <v-btn class="bottone" size="large" color="#005676" @click="register"><span class="label">Registrati</span></v-btn>
                    </div>
                    <div class="err">{{ err }}</div>
                    
                </div>
            </div>
      
    </v-container>
</template>

      
<script setup lang="ts">
import AuthService from '@/services/AuthService';
//import 
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
.areaButtons{
    display: flex;
    gap: 10px;
    justify-content: space-around;
    justify-items: center;
    margin-top: 10px;
    color: #f9b63c;
    width: 100%;
}
.bottone{
    width: 45%;
}
</style>

<template>
    <v-card>
        <v-card-title class="text-h6">Profile Information</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="saveProfile">
                <v-row>
                    <v-col cols="6" sm="12">
                        <v-text-field color="#005676" :disabled="edit" v-model="user.userName" label="Username"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="12">
                        <v-text-field color="#005676" :disabled="edit" v-model="user.email" label="Email"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  cols="6" sm="12">
                        <v-text-field color="#005676" v-if="!edit" v-model="user.password" label="Password"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="12" class="areaButtons">
                        <v-btn v-if="!edit" type="submit" color="#005676"><span class="testo">Save</span></v-btn>
                        <v-btn @click="cancelEdit" color="#005676"><span class="testo"> {{ !edit ? 'Cancel' : 'Edit' }}   </span> </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore.ts';

const userInstance = useUserStore();
const edit = ref(true);

const user = ref({
    username: userInstance.userName,
    email: userInstance.userMail,
    password: userInstance.password,
});

const cancelEdit = () => {
    edit.value = !edit.value;
    user.value = useUserStore().getUser();
};

const saveProfile = () => {
    edit.value = false;
    const userStore = useUserStore();
    userStore.updateProfile(user.value);
};
</script>

<style scoped>
.areaButtons {
    display: flex;
    justify-content: flex-end;
    column-gap: 1rem;

}

.testo{
    color: #f9b63c ; 
    font-weight: 550;
}
</style>
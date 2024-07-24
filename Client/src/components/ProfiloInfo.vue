<template>
    <div class="container">
        <v-card>
            <v-card-title class="text-h6">Profile Information</v-card-title>
            <v-card-text>
                <v-form>
                    <div v-if="!edit" class="intestazione">Profile Information</div>
                    <v-row>
                        <v-col cols="6" sm="12">
                            <v-text-field
                                color="#005676"
                                :readonly="edit"
                                v-model="user.userName"
                                label="Username"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" sm="12">
                            <v-text-field
                                color="#005676"
                                :readonly="edit"
                                v-model="user.userMail"
                                label="Email"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" sm="12">
                            <v-text-field
                                color="#005676"
                                v-if="!edit"
                                v-model="newPassword"
                                label="Nuova Password"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" sm="12" class="areaButtons">
                            <v-btn color="#005676" @click="logout">
                                <span class="testo">Logout</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import { useIdeaStore} from '../stores/ideaStore'
import AuthService from '../services/AuthService'
import type { UserItem } from '@/services/user-item.type';

const userInstance = useUserStore();
const router = useRouter();
const ideaInstance = useIdeaStore();
const edit = ref(true);

onMounted(() => {
    user.value = userInstance.getUser();
});

const user = ref({
    userName: userInstance.user.userName,
    userMail: userInstance.user.userMail,
    password: userInstance.user.password,
});


const logout=()=>{
    userInstance.clearUser();
    ideaInstance.clearIdea();
    AuthService.logout();
    router.push('/');
};
</script>

<style scoped>
.areaButtons {
    display: flex;
    justify-content: flex-end;
    column-gap: 1rem;
}

.testo {
    color: #f9b63c;
    font-weight: 550;
}

.intestazione {
    color: #f9b63c;
    background-color: #005676;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
    font-size: 1.5rem;
}

.container {
    width: 100%;
}
</style>

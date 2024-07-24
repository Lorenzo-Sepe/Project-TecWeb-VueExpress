<template>
    <div class="container">
    <v-form v-model="valid" @submit.prevent>
        <v-container fill-height>
            <h1 class="intestazione">Condividi la tua idea</h1>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-text-field
                        color="#005676"
                        v-model="newIdea.title"
                        label="Titolo"
                        required
                        :rules="[(v) => !!v || 'Il titolo è obbligatorio']"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <h3 id="label" class="intestazione" :class="{ badInput: hasError }">
                        Contenuto
                    </h3>
                    <Markdown v-model="newIdea.content" label="Contenuto" required></Markdown>
                </v-col>
                <v-col cols="12">
                    <v-btn
                        @click="createPost"
                        :disabled="!valid"
                        color="#005676"
                        dark
                        size="x-large"
                        rounded
                        class="mt-4"
                    >
                        <span class="bottonetesto">Crea Idea</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Markdown from '../components/MarkDown.vue';
import { useIdeaStore } from '../stores/ideaStore';
import { IdeaService } from '../services/IdeaServices';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import type { IdeaItem } from '@/services/idea-item.type';

const router = useRouter();
const userInstance = useUserStore();

const valid = ref(true);
const hasError = ref(false);
const newIdea = ref({
    title: '',
    content: '',
    userMail: userInstance.user.userMail,
});

const validate = () => {
    if (!newIdea.value.title) {
        valid.value = false;
        hasError.value = true;
        alert('Il titolo è obbligatorio');
    }
    if (!newIdea.value.content) {
        valid.value = false;
        hasError.value = true;
        alert('Il contenuto è obbligatorio');
    }
    valid.value = true;
};
const createPost = () => {
    validate();
    try {
        IdeaService.createIdea({
            title: newIdea.value.title,
            content: newIdea.value.content,
            userMail: newIdea.value.userMail,
        } as IdeaItem);
        router.push({path:'/profilo'})
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
.container{
    height: 100vh;
}
.intestazione {
    color: #005676;
}
.bottonetesto {
    color: #f9b63c;
}

.valid-input {
    color: #005676;
}
.badInput {
    color: #b00020;
    border-bottom: #b00020 1px solid;
}

.badInput::after {
    content: 'Il contenuto è obbligatorio';
    display: block;
    color: #b00020;
    font-size: 0.7rem;
}
</style>

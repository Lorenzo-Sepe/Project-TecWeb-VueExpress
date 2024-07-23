<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
    <div class="cardSizing">
        <v-container>
            <v-row>
                <v-col v-for="idea in ideasArray" :key="idea.id" cols="12" sm="6" md="4">
                    <v-card color="#005676">
                        <template v-slot:title
                            ><span class="title">{{ idea.title }}</span></template
                        >
                        <v-card-subtitle class="bg-surface-light">
                            <v-chip class="chip-space" prepend-icon="mdi-account">
                                {{ idea.userMail }}
                            </v-chip>
                        </v-card-subtitle>
                        
                        <v-card-text class="bg-surface-light pt-4" v-html="idea.content"></v-card-text>
                        <v-card-item class="bg-surface-light pt-4">
                            <v-chip class="chip-space" prepend-icon="mdi-plus-circle">
                                {{ idea.upvotes }}
                            </v-chip>
                            <v-chip class="chip-space" prepend-icon="mdi-minus-circle">
                                {{ idea.downvotes }}
                            </v-chip>
                        </v-card-item>
                        <v-card-actions class="bg-surface-light pt-4 ">
                            
                                <v-btn @click="caricaIdeaVisualizza(idea)" color="#005676">Leggi di più</v-btn>
                            
                            <p v-if="edit" class="tw-block">
                                
                                    <v-btn @click="caricaIdeaModifica(idea)" color="#005676">Modifica Idea</v-btn>
                                
                            </p>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
    //{{ ideasArray[0] }}
</template>

<script setup lang="ts">
import { useIdeaStore } from '@/stores/ideaStore';
import { defineProps } from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const props = defineProps<{
    ideasArray: Array<{
        id: string | number;
        title: string;
        content: string;
        upvotes: number;
        downvotes: number;
        userMail: string;
    }>;
    edit: boolean;
}>();

async function caricaIdeaVisualizza(selectedIdea: any) {
    const ideaInstance = useIdeaStore();
    ideaInstance.setIdea(
      {
        id: selectedIdea.id,
        title: selectedIdea.title,
        content: selectedIdea.content,
        upvotes: selectedIdea.upvotes,
        downvotes: selectedIdea.downvotes,
        userMail: selectedIdea.userMail,
      }
    );
    router.push({ name: 'VisualizzaIdea', params: { id: selectedIdea.id } });
}

async function caricaIdeaModifica(selectedIdea: any) {
    const ideaInstance = useIdeaStore();
    ideaInstance.setIdea(
      {
        id: selectedIdea.id,
        title: selectedIdea.title,
        content: selectedIdea.content,
        upvotes: selectedIdea.upvotes,
        downvotes: selectedIdea.downvotes,
        userMail: selectedIdea.userMail,
      }
    );
    router.push({ name: 'ModificaIdea', params: { id: selectedIdea.id } });
}

</script>

<style scoped>
.chip-space {
    margin-right: 10px;
}
.title {
    height: 2rem;
    color: rgb(249 182 60/1);
    background-color: rgb(0 86 118 / 1) /* #005676 */;
    font-size: 1.5rem;
    padding-left: 0.5rem;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
    font-weight: bold;
    width: 500px;
}
</style>

<template>
    <div class="cardSizing">
        <v-container>
            <v-row>
                <v-col v-for="idea in ideasArray" :key="idea.id" cols="12" sm="6" md="4">
                    <v-card color="#005676">
                        <template v-slot:title
                            ><span class="title">{{ idea.title }}</span></template>
                        <v-card-text class="bg-surface-light pt-4">{{
                            idea.content
                        }}</v-card-text>
                        <v-card-item class="bg-surface-light pt-4">
                            <v-chip class="chip-space" prepend-icon="mdi-plus-circle">
                                {{ idea.upvotes }}
                            </v-chip>
                            <v-chip class="chip-space" prepend-icon="mdi-minus-circle">
                                {{ idea.downvotes }}
                            </v-chip>
                        </v-card-item>
                        <v-card-actions class="bg-surface-light pt-4">
                            <router-link :to="{ name: 'VisualizzaIdea', params: { id: idea.id } }">
                                <v-btn color="#005676">Leggi di più</v-btn>
                            </router-link>
                            <div v-if=edit>
                                <router-link :to="{ name: 'ModificaIdea', params: { id: idea.id } }">
                                <v-btn color="#005676">Modifica Idea</v-btn>
                            </router-link>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    ideasArray: {
        id: string | number;
        title: string;
        upvotes: number;
        downvotes: number;
        content: string;
    }[];
    edit: boolean;
}>();

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
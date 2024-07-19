<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="#f9b63c">
            <v-tab value="one"><span class="labels">Più Recenti</span></v-tab>
            <v-tab value="two"><span class="labels">Più Controverse</span></v-tab>
            <v-tab value="three"><span class="labels">Più Popolari</span></v-tab>
            <v-tab value="four"><span class="labels">Più Sfavorite</span></v-tab>
        </v-tabs>

        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <Catalog />
                </v-tabs-window-item>

                <v-tabs-window-item value="two"> Two </v-tabs-window-item>

                <v-tabs-window-item value="three"> Three </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Catalog from './CatalogComponent.vue';
const tab = ref('one');
</script>

<style scoped>
.labels {
    font-weight: 550;
    color: #005676;
}
</style>

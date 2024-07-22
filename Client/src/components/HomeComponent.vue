<template>
    <div class="container">
        <div>
            <v-tabs v-model="tab" bg-color="#f9b63c">
                <v-tab value="one"><span class="labels">Più Recenti</span></v-tab>
                <v-tab value="two"><span class="labels">Più Controverse</span></v-tab>
                <v-tab value="three"><span class="labels">Più Popolari</span></v-tab>
                <v-tab value="four"><span class="labels">Più Sfavorite</span></v-tab>
            </v-tabs>

            <div>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="one">
                        <Catalog ordinamento="recenti"></Catalog>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="two">
                        <Catalog ordinamento="controverse"></Catalog>
                    </v-tabs-window-item>

                    <v-tabs-window-item value="three">
                        <Catalog ordinamento="popolari"></Catalog>
                    </v-tabs-window-item>
                    <v-tabs-window-item value="four">
                        <Catalog ordinamento="sfavorite"></Catalog>
                    </v-tabs-window-item>
                </v-tabs-window>
            </div>
        </div>
    </div>
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
.container {
    height: 100vh;
}
</style>

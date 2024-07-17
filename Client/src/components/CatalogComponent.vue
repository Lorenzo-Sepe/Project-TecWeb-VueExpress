<template>
    <div>
        <v-container>
            <v-row>
                <v-col v-for="article in articles" :key="article.id" cols="12" sm="6" md="4">
                    <v-card>
                        <v-card-title>{{ article.title }}</v-card-title>
                        <v-card-text>{{ article.description }}</v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" >Read More</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">

const articles= [
                {
                    id: 1,
                    title: 'Article 1',
                    description: 'This is the description for Article 1.',
                    image: 'https://example.com/article1.jpg',
                },
                {
                    id: 2,
                    title: 'Article 2',
                    description: 'This is the description for Article 2.',
                    image: 'https://example.com/article2.jpg',
                },
                {
                    id: 3,
                    title: 'Article 3',
                    description: 'This is the description for Article 3.',
                    image: 'https://example.com/article3.jpg',
                },
            ]
</script>

<style scoped>
/* Add custom styles here */
</style>
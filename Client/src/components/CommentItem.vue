<template>
    <div>
        <v-card color="#005676">
            <v-list>
                <v-list-item v-for="comment in props.commentArray" :key="comment.id">
                    <v-list-item-content>
                        <v-list-item-title class="header">
                            <v-icon>mdi-account</v-icon>
                            {{ comment.userMail }}
                        </v-list-item-title>
                        <div v-html="comment.content"></div>
                        <v-btn v-if="props.canc" @click="deleteComment(comment.id)" icon="mdi-delete" variant="tonal" color="#005676"></v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { CommentService } from '@/services/CommentService';
import { ref } from 'vue'
import {useRouter} from 'vue-router'

const modify = ref(false)
const router = useRouter()
const props = defineProps<{
    commentArray: Array<{
        id: number,
        userMail: string,
        content: string
    }>,
    canc: boolean
}>()

const deleteComment = (id: number) => {
    console.log('deleteComment: %o', id)
    CommentService.deleteComment(id).then(() => {
        alert('Commento eliminato con successo!');
        router.go(0);
    }).catch((error) => {
        console.error(error);
    })
}
</script>

<style scoped>
.corpo{
    background-color: whitesmoke;
   
}
.header{
    color: #f9b63c;
    background-color: #005676;
    width: 100%;
}
</style>
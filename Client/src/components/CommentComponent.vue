<template>
    <div>
        <h2>Comments</h2>
        <Comment :commentArray="comments.map(comment => ({ id: Number(comment.id), userMail: comment.userMail ?? '', content: comment.content }))" :canc="canc"/>
        
        <v-pagination  v-model="currentPage" :length="lunghezzaLista$!"></v-pagination>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import { CommentService } from '../services/CommentService';
import { catchError, combineLatestWith, map, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';
import { from, useObservable } from '@vueuse/rxjs';
import type { CommentItem } from '@/services/comment-item.type';
import { useIdeaStore } from '@/stores/ideaStore';
import Comment from './CommentItem.vue';

const props=defineProps<{
    canc: boolean;
}>();

const ideaStore = useIdeaStore();
const onMounted$ = new Subject<void>();
const currentPage = ref(1);
const pageSize = 10;
const comments = ref([] as CommentItem[]);

    


onMounted(async() => {
    onMounted$.next();
    await CommentService.getCommentOld(ideaStore.idea.id)
    .then((response) => {
        comments.value = response.data as unknown as CommentItem[];
        console.log('response: %o', response.data);
        return response.data;
    }).catch((error) => {
        console.error(error);
});
});



const Comments$: Observable<CommentItem[]> = onMounted$.pipe(
    switchMap(() => CommentService.getComment(ideaStore.idea.id)))
    .pipe(
    tap(() => console.log('ideaStore.idea.id: %o', ideaStore.idea.id)))
    .pipe(
    catchError(err => {
        console.error(err);
        return of([] as CommentItem[]);
    }))
    .pipe(switchMap(() => CommentService.getComment(ideaStore.idea.id)))
    .pipe(tap(() => console.log('ideaStore.idea.id: %o', ideaStore.idea.id)))
    .pipe(catchError(err => (console.error(err), of([] as CommentItem[]))));



const sortedComments$ = useObservable(
    Comments$
    .pipe(combineLatestWith(from(currentPage)
        .pipe(startWith(1))
        .pipe(tap(() => console.log('currentPage: %o', currentPage.value)))
    ))
    .pipe(map(([Comments, page]) => {
        let ris: CommentItem[] = [];
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
         ris.slice(start, end);
         console.log('ris: %o', ris);
         return ris;
    }))
    .pipe(startWith([])));


const lunghezzaLista$ = useObservable(Comments$.pipe(map(Comments => {
    let arrotondamento = Comments.length + (pageSize - (Comments.length % pageSize));
    let lunghezzaLista = arrotondamento / pageSize;
    return Math.floor(lunghezzaLista);
    }))
    .pipe(startWith(0)));
</script>


<template>
    <div v-if="loading" class="tw-p-3 tw-gap-2">
        <v-skeleton-loader type="card"></v-skeleton-loader>
        <v-skeleton-loader type="card"></v-skeleton-loader>
        <v-skeleton-loader type="card"></v-skeleton-loader>
    </div>

    <div class="container" v-else>
        <v-pagination  v-model="currentPage" :length="lunghezzaLista$"></v-pagination>
        <IdeaCard :ideasArray="sortedIdeas$!" :edit="edit" class="cardsSize" />
        <v-pagination   v-model="currentPage" :length="lunghezzaLista$"></v-pagination>
    </div>
</template>

<script setup lang="ts">
import type { IdeaItem } from '@/services/idea-item.type';
import IdeaCard from '../components/IdeaCardComponent.vue';
import { IdeaService } from '@/services/IdeaServices';
import { onMounted, ref } from 'vue';
import { catchError, combineLatestWith, map, Observable, of, startWith, Subject, switchMap, tap, withLatestFrom} from 'rxjs';
import { from,  useObservable } from '@vueuse/rxjs';

const loading = ref(false);

const props = defineProps({
    ordinamento: String,
});

const onMounted$ = new Subject<void>();

const currentPage = ref(1);
const pageSize = 10;

const ideas$: Observable<Array<IdeaItem>> = onMounted$
    .pipe(switchMap(() => IdeaService.getIdeas()))
    .pipe(catchError(err => (console.error(err), of([] as IdeaItem[]))))
    .pipe(tap(() => loading.value = false));

onMounted(() => {
    onMounted$.next();
});

const sortedIdeas$ = useObservable(
    ideas$
    .pipe(combineLatestWith(from(currentPage)
        .pipe(startWith(1))
        .pipe(tap(() => console.log('currentPage: %o', currentPage.value)))
    ))
    .pipe(map(([ideas, page]) => {
        console.log('!?', ideas, page);

        let ris = [];
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        console.log('start: %o, end: %o', start, end);
        switch(props.ordinamento) {
            case 'popolari':
                ris = [...ideas].sort((a, b) => b.upvotes - a.upvotes);
                return ris.slice(start, end);
                
            case 'sfavorite':
                ris = [...ideas].sort((a, b) => b.downvotes - a.downvotes);
                return ris.slice(start, end);
                
            case 'controverse':
                //ris = [...ideas].sort((a, b) => (b.upvotes / b.downvotes) - (a.upvotes / a.downvotes));
                ris = [...ideas].sort((a, b) => {
                    const ratioA = a.upvotes / a.downvotes;
                    const ratioB = b.upvotes / b.downvotes;
                    return Math.abs(ratioA - 1) - Math.abs(ratioB - 1);
                });
                return ris.slice(start, end);
            
            default:
                ris = [...ideas].sort((a: IdeaItem, b: IdeaItem) => (b.id as unknown as number) - (a.id as unknown as number));
                return ris.slice(start, end);
                
        }
    })).pipe(startWith([])));

const edit: boolean = false;

const lunghezzaLista$ = useObservable(ideas$.pipe(map(ideas => {
    let arrotondamento = ideas.length + (pageSize - (ideas.length % pageSize));
    let lunghezzaLista = arrotondamento / pageSize;
    return Math.floor(lunghezzaLista);
})).pipe(startWith(0)));
</script>

<style scoped>
div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}
.cardsSize {
    display: flex;
    flex-grow: true;
    width: 100%;
}
</style>

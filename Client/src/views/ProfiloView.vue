<template>
    <div class="grid-container">
        
            <ProfiloInfo class="profilo"/>
            <div class="idee">
            <IdeePersonali  :ideasArray="sortedIdeas$!" :edit="edit" />
            <v-pagination  v-model="currentPage" :length="lunghezzaLista$!"></v-pagination>
            </div>
    </div>
</template>

<script setup lang="ts">
import ProfiloInfo from '../components/ProfiloInfo.vue';
import IdeePersonali from '../components/IdeaCardComponent.vue';
import type {IdeaItem} from '@/services/idea-item.type';
import { IdeaService } from '@/services/IdeaServices';
import { onMounted, ref } from 'vue';
import { catchError, combineLatestWith, map, Observable, of, startWith, Subject, switchMap, tap, withLatestFrom} from 'rxjs';
import { from,  useObservable } from '@vueuse/rxjs';

const edit=true
const onMounted$ = new Subject<void>();

const currentPage = ref(1);
const pageSize = 10;

const ideas$: Observable<Array<IdeaItem>> = onMounted$
    .pipe(switchMap(() => IdeaService.getIdeasUser()))
    .pipe(catchError(err => (console.error(err), of([] as IdeaItem[]))));

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
        ris = [...ideas].sort((a, b) => b.id - a.id);
        return ris.slice(start, end);
    })).pipe(startWith([])));


    const lunghezzaLista$ = useObservable(ideas$.pipe(map(ideas => {
    let arrotondamento = ideas.length + (pageSize - (ideas.length % pageSize));
    let lunghezzaLista = arrotondamento / pageSize;
    return Math.floor(lunghezzaLista);
})).pipe(startWith(0)));
</script>

<style scoped>
.grid-container {
    padding: 1rem;
  display: grid;
  height: 100vh;
  gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
    "profilo idee"
    "empty idee"
    "empty idee";
    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
        grid-template-areas: 
        "profilo"
        "pagination"
        "idee";
        
    }
}

.profilo {
    grid-area: profilo;
}

.idee {
    grid-area: idee;
}


</style>

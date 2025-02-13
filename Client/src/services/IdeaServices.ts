import type { IdeaItem } from './idea-item.type';
import Api, { APIv1 } from './api';
import { map } from 'rxjs';

export class IdeaService {
    static createIdea(idea: IdeaItem) {
        return APIv1().post('idea', idea);
    }

    static getIdea(id: string) {
        return APIv1().get<IdeaItem>(`idea/${id}`);
    }

    static getIdeas() {
        console.log('getIdeas');
        return Api().get<IdeaItem[]>('idea/all')
            .pipe(map(r => r.data));
    }

    static getIdeasUser(){
        return Api().get<IdeaItem[]>('ideaUser')
        .pipe(map(r=>r.data));
    }

    static deleteIdea(id: string) {
        return APIv1().delete(`idea/${id}`);
    }

    static updateIdea(idea: IdeaItem) {
        return APIv1().put(`idea/${idea.id}`, idea);
    }

    static voteIdea(idea: IdeaItem) {
        return APIv1().put(`idea/${idea.id}/vote`,idea);
    }
}

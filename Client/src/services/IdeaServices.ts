import type { IdeaItem } from './idea-item.type';
import Api from './api';

export class IdeaService {
    static createIdea(idea: IdeaItem) {
        return Api().post('idea', idea);
    }

    static getIdeas() {
        return Api().get<IdeaItem[]>('idea');
    }

    static deleteIdea(id: string) {
        return Api().delete(`idea/${id}`);
    }

    static updateIdea(idea: IdeaItem) {
        return Api().put('idea', idea);
    }
}

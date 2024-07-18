import type {IdeaItem} from './idea-item.type';
import Api from './api'

export class IdeaService{
    getIdeas(){
        return Api().get<IdeaItem[]>('idea')
    }
}
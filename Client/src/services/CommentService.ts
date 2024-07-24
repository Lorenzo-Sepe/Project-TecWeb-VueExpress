import type { CommentItem } from './comment-item.type';
import Api, { APIv1 } from './api';
import { map } from 'rxjs';

export class CommentService {
    static createComment(comment: CommentItem) {
        console.log('Service: ', comment);
        return APIv1().post('comment', comment); // Correct the endpoint here
    }

    static getComment(id: string) {
        console.log('Service: ', id);
        return Api().get<CommentItem>(`comment/${id}`)
            .pipe(map(r => r.data));
    }

    static getCommentOld(id: string) {
        console.log('Service: ', id);
        return APIv1().get<CommentItem>(`comment/${id}`);
    }

    static deleteComment(id: string) {
        return APIv1().delete(`comment/${id}`);
    }

    static updateComment(comment: CommentItem) {
        return APIv1().put(`comment/${comment.id}`, comment);
    }
}

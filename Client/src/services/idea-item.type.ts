export interface IdeaItem {
    id?: number;
    title?: string;
    content?:string;
    upvotes?: number;
    downvotes?:number;
    UserMail?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
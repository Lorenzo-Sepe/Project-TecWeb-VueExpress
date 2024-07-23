export interface IdeaItem {
    id: string;
    title: string;
    content: string;
    upvotes: number;
    downvotes: number;
    userMail: string;
    createdAt?: Date;
    updatedAt?: Date;
}

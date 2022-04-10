export interface ICreatePost {
    id: number;
    title: string;
    shortDescription: string;
    content: string;
    bloggerId: number;
}

export interface IUpdatePost {
    title: string;
    shortDescription: string;
    content: string;
    bloggerId: number;
}
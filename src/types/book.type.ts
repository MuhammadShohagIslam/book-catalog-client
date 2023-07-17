export interface IBook {
    _id?: string;
    title: string;
    image:string;
    genre: string;
    author: {
        email: string;
        id:string;
        name:string;
    } | string;
    publicationDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    reviews?: {
        name: string;
        email: string;
        review: string;
        bookId: string;
    };
}

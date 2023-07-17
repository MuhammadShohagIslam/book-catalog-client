export interface IBook {
    _id?: string;
    title: string;
    image:string;
    genre: string;
    author: {
        name: string;
        authorId:string;
    } | string;
    publicationDate: Date;
    createdAt?: string ;
    updatedAt?: Date;
    reviews?: {
        name: string;
        email: string;
        review: string;
        bookId: string;
    };
}

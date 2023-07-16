export interface IBook {
    title: string;
    image:string;
    genre: string;
    author: string;
    publicationDate: Date;
    reviews?: {
        name: string;
        email: string;
        review: string;
        bookId: string;
    };
}

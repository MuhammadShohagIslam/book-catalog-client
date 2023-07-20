export interface IBook {
    _id?: string;
    title: string;
    image: string;
    genre: string;
    user: {
        _id: string;
        name: string;
        email: string;
    } | string;
    author: string;
    publicationDate: string;
    createdAt?: string;
    updatedAt?: Date;
    reviews?: {
        name: string;
        email: string;
        review: string;
        bookId: string;
        _id?: string;
    }[];
}

export interface IReview {
    name: string;
    email: string;
    review: string;
    bookId: string | undefined;
}

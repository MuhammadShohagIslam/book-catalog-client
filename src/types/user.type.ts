export interface IUser {
    userId?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    author?: {
        name: string;
        userId: string;
    };
    wishList?: {
        bookId: string;
    };

    completedReadBook?: {
        bookId: string;
    };
    readSoonBook?: {
        bookId: string;
    };
}

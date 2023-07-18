/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IBook, IReview } from "../../../types/book.type";
import { baseApi } from "../../api/apiSlice";

const bookApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addBook: build.mutation({
            query: (payload: IBook) => ({
                url: "books",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: ["Books"],
        }),
        allBooks: build.query({
            query: ({
                searchTerm,
                genre,
            }: {
                searchTerm: string;
                genre: string;
            }) =>
                `books${searchTerm && `?searchTerm=${searchTerm}`}${
                    genre && `${!searchTerm ? "?" : "&"}genre=${genre}`
                }`,
            providesTags: ["Books"],
        }),
        singleBook: build.query({
            query: (payload: string) => `books/${payload}`,
            providesTags: ["Books", "Reviews"],
        }),
        deleteBook: build.mutation({
            query: (payload: string) => ({
                url: `books/${payload}`,
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: ["Books"],
        }),
        createReview: build.mutation({
            query: (payload: IReview) => ({
                url: "books/reviews",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: ["Reviews"],
        }),
        getReviews: build.query({
            query: () => `books/reviews`,
            providesTags: ["Reviews"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddBookMutation,
    useAllBooksQuery,
    useSingleBookQuery,
    useDeleteBookMutation,
    useCreateReviewMutation,
    useGetReviewsQuery,
} = bookApi;

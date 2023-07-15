import { IBook } from "../../../types/book.type";
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
                },
            }),
            invalidatesTags: ["Books"],
        }),
        allBooks: build.query({
            query: () => `books`,
            providesTags: ["Books"],
        }),
    }),
    overrideExisting: false,
});

export const { useAddBookMutation, useAllBooksQuery } = bookApi;

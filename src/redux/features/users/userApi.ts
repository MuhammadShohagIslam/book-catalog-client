/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IUser } from "../../../types/user.type";
import { baseApi } from "../../api/apiSlice";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (payload: IUser) => ({
                url: "auth/signup",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
        loginUser: build.mutation({
            query: (payload: Pick<IUser, "email" | "password">) => ({
                url: "auth/login",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
        getUser: build.query({
            query: () => ({
                url: "auth/get-user",
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags:["Users"]
        }),
        addWishList: build.mutation({
            query: (payload: { bookId: string }) => ({
                url: "auth/wishlist",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
            providesTags: ["Users"]
        }),
        deleteWishList: build.mutation({
            query: (payload: { bookId: string; wishListId: string }) => ({
                url: `auth/wishlist/${payload.bookId}`,
                method: "DELETE",
                body: payload.wishListId,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
        }),
        addReadingSoon: build.mutation({
            query: (payload: { bookId: string }) => ({
                url: "auth/reading-soon",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
        }),
        deleteReadingSoon: build.mutation({
            query: (payload: { bookId: string; readingSoonId: string }) => ({
                url: `auth/reading-soon/${payload.bookId}`,
                method: "DELETE",
                body: payload.readingSoonId,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
        }),
        addReadingComplete: build.mutation({
            query: (payload: {
                bookId: string
            }) => ({
                url: "auth/reading-completed",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
        }),
        deleteReadingComplete: build.mutation({
            query: (payload: {
                bookId: string;
                readingCompletedId: string;
            }) => ({
                url: `auth/reading-completed/${payload.bookId}`,
                method: "DELETE",
                body: payload.readingCompletedId,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    authorization: `bear ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateUserMutation,
    useLoginUserMutation,
    useGetUserQuery,
    useAddWishListMutation,
    useDeleteWishListMutation,
    useAddReadingCompleteMutation,
    useDeleteReadingCompleteMutation,
    useAddReadingSoonMutation,
    useDeleteReadingSoonMutation,
} = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://68.178.162.203:8080/application-test-v1.1/",
});

export const bookApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (data) => {
        const { page, title } = data;
        return `books?page=${page}&title=${title}`;
      },
      providesTags: ["booksList"],
    }),
    postBook: builder.mutation({
      query: (requestData) => ({
        url: "books",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["booksList"],
    }),
    putBook: builder.mutation({
      query: (requestData) => ({
        url: `books/${requestData.id}`,
        method: "PUT",
        body: requestData,
      }),
      invalidatesTags: ["booksList"],
    }),
  }),
});

export const { useGetBooksQuery, usePostBookMutation, usePutBookMutation } =
  bookApi;

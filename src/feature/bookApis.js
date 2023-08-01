import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://68.178.162.203:8080/application-test-v1.1/",
});

export const bookApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (page = 1) => `books?page=${page}`,
    }),
    postBook: builder.mutation({
      query: (requestData) => ({
        url: "books",
        method: "POST",
        body: requestData,
      }),
      onSuccess: (context) => {
        context.dispatch(bookApi.endpoints.getBooks.initiate());
      },
    }),
    putBook: builder.mutation({
      query: (requestData) => ({
        url: `books/${requestData.id}`,
        method: "PUT",
        body: requestData,
      }),
      onSuccess: (context) => {
        context.dispatch(bookApi.endpoints.getBooks.initiate());
      },
    }),
  }),
});
// console.log(bookApi);
export const { useGetBooksQuery, usePostBookMutation, usePutBookMutation } =
  bookApi;

// export const { getBooksQuery, addBookQuery, updateBookQuery } =
//   bookApi.endpoints;
////////////////////////////////////

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (page) => {
  return axios
    .get(`http://68.178.162.203:8080/application-test-v1.1/books?page=${page}`)
    .then((response) => response.data);
});

// Create the RTK Query API
export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    // Define the paginated query
    getPaginatedData: builder.query({
      query: (page = 1) => `books?page=${page}`,
    }),
  }),
});

// console.log(api);
export const { useGetPaginatedDataQuery } = api;

export const addBook = createAsyncThunk(
  "book/addBook",
  (data, { rejectWithValue }) => {
    return axios
      .post("http://68.178.162.203:8080/application-test-v1.1/books", data)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.data.message)
          return rejectWithValue(error.response.data.message);
        return error;
      });
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  (data, { rejectWithValue }) => {
    return axios
      .put(
        `http://68.178.162.203:8080/application-test-v1.1/books/${data.id}`,
        data
      )
      .then((response) => response.data);
    // .catch((error) => {
    //   if (error.response.data.message)
    //     return rejectWithValue(error.response.data.message);
    //   return error;
    // });
  }
);

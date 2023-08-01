import { createSlice } from "@reduxjs/toolkit";
import { addBook, fetchBooks, updateBook } from "./bookApis";
import { bookApi } from "./bookApis";

const initialState = {
  bookList: [],
  errorMessage: "",
  loading: false,
  successMessage: "",
  openEditModal: false,
  openAddModal: false,
  page: 1,
  totalPages: 0,
};

// const {
//   getBooks: getBookQuery,
//   addBook: addBookQuery,
//   updateBook: updateBookQuery,
// } = bookApi.endpoints;

// console.log("getBook", getBookQuery);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    openEditModalAction: (state) => {
      state.openEditModal = !state.openEditModal;
      state.openAddModal = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    openAddModalAction: (state) => {
      state.openAddModal = !state.openAddModal;
      state.openEditModal = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
    setPreviosPage: (state) => {
      state.page -= 1;
    },
    setNextPage: (state) => {
      state.page += 1;
    },
  },

  // extraReducers: (builder) => {
  // builder.addCase(bookApi.endpoints.getBooks.pending, (state) => {
  //   state.loading = true;
  //   state.successMessage = "";
  //   state.errorMessage = "";
  // });
  // builder.addCase(getBookQuery.fulfilled, (state, action) => {
  //   state.loading = false;
  //   state.bookList = action.payload.data;
  //   state.errorMessage = "";
  //   state.totalPages = action.payload.pagination.totalPages;
  // });
  // builder.addCase(getBookQuery.rejected, (state, action) => {
  //   state.loading = false;
  //   state.bookList = [];
  //   state.errorMessage = "Failed to Get Book!!";
  //   state.successMessage = "";
  // });
  // builder.addCase(addBookQuery.pending, (state) => {
  //   state.loading = true;
  //   state.successMessage = "";
  //   state.errorMessage = "";
  // });
  // builder.addCase(addBookQuery.fulfilled, (state) => {
  //   state.loading = false;
  //   state.successMessage = "Book added successfully!";
  //   state.errorMessage = "";
  // });
  // builder.addCase(addBookQuery.rejected, (state, action) => {
  //   state.loading = false;
  //   state.errorMessage =
  //     action.payload || "Failed to Add Book!! Please try again.";
  //   state.successMessage = "";
  // });
  // builder.addCase(updateBookQuery.pending, (state) => {
  //   state.loading = true;
  //   state.successMessage = "";
  //   state.errorMessage = "";
  // });
  // builder.addCase(updateBookQuery.fulfilled, (state) => {
  //   state.loading = false;
  //   state.successMessage = "Book is updated successfully!";
  //   state.errorMessage = "";
  // });
  // builder.addCase(updateBookQuery.rejected, (state, action) => {
  //   state.loading = false;
  //   state.errorMessage = "Failed to Update Book!! Please try again.";
  //   state.successMessage = "";
  // });
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBooks.pending, (state) => {
  //     state.loading = true;
  //     state.successMessage = "";
  //     state.errorMessage = "";
  //   });
  //   builder.addCase(fetchBooks.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.bookList = action.payload.data;
  //     state.errorMessage = "";
  //     state.totalPages = action.payload.pagination.totalPages;
  //   });
  //   builder.addCase(fetchBooks.rejected, (state, action) => {
  //     state.loading = false;
  //     state.bookList = [];
  //     state.errorMessage = "Failed to Get Book!!";
  //     state.successMessage = "";
  //   });
  //   builder.addCase(addBook.pending, (state) => {
  //     state.loading = true;
  //     state.successMessage = "";
  //     state.errorMessage = "";
  //   });
  //   builder.addCase(addBook.fulfilled, (state) => {
  //     state.loading = false;
  //     state.successMessage = "Book added successfully!";
  //     state.errorMessage = "";
  //   });
  //   builder.addCase(addBook.rejected, (state, action) => {
  //     state.loading = false;
  //     state.errorMessage =
  //       action.payload || "Failed to Add Book!! Please try again.";
  //     state.successMessage = "";
  //   });
  //   builder.addCase(updateBook.pending, (state) => {
  //     state.loading = true;
  //     state.successMessage = "";
  //     state.errorMessage = "";
  //   });
  //   builder.addCase(updateBook.fulfilled, (state) => {
  //     state.loading = false;
  //     state.successMessage = "Book is updated successfully!";
  //     state.errorMessage = "";
  //   });
  //   builder.addCase(updateBook.rejected, (state, action) => {
  //     state.loading = false;
  //     state.errorMessage = "Failed to Update Book!! Please try again.";
  //     state.successMessage = "";
  //   });
  // },
});

export const {
  openEditModalAction,
  openAddModalAction,
  setBookList,
  setPreviosPage,
  setNextPage,
} = bookSlice.actions;

export default bookSlice.reducer;

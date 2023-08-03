import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  errorMessage: "",
  loading: false,
  successMessage: "",
  openEditModal: false,
  openAddModal: false,
  page: 1,
  totalPages: 0,
  title: "",
  sortBy: "default",
  filterObject: {},
  sortedArrayKey: "sort",
};

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
      state.errorMessage = "";
      state.page -= 1;
    },
    setNextPage: (state) => {
      state.errorMessage = "";
      state.page += 1;
    },
    setTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchText: (state, action) => {
      state.title = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterObject: (state, action) => {
      state.errorMessage = "";
      state.filterObject = action.payload;
      state.page = 1;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
      state.successMessage = "";
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
      state.errorMessage = "";
    },
    resetMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
    setSortedArrayKey: (state, action) => {
      state.errorMessage = "";
      state.sortedArrayKey = action.payload;
    },
  },
});

export const {
  openEditModalAction,
  openAddModalAction,
  setBookList,
  setPreviosPage,
  setNextPage,
  setTotalPage,
  setSearchText,
  setSortBy,
  setFilterObject,
  setErrorMessage,
  setSuccessMessage,
  resetMessage,
  setSortedArrayKey,
} = bookSlice.actions;

export default bookSlice.reducer;

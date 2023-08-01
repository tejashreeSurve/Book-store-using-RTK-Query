import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./feature/bookSlice";
import { api } from "./feature/bookApis";
import { bookApi } from "./feature/bookApis";

const store = configureStore({
  reducer: {
    books: bookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    // [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware), // Add the RTK Query middleware
});

export default store;

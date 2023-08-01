import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  getBooksQuery,
  updateBook,
  useGetBooksQuery,
} from "../../feature/bookApis";
import BookCard from "../BookCard/BookCard";
import { openEditModalAction } from "../../feature/bookSlice";
import ModalComponent from "../../sharedComponents/ModalComponent";
import { Pagination } from "../Pagination/Pagination";
import { useGetPaginatedDataQuery } from "../../feature/bookApis";

const BookList = () => {
  const dispatch = useDispatch();

  const {
    bookList,
    openEditModal,
    errorMessage,
    successMessage,
    // page,
    totalPages,
  } = useSelector((state) => state.books);
  const [editBook, setEditBook] = useState({});
  const [page, setPage] = useState(1);

  const { data } = useGetBooksQuery(page);
  console.log(data);

  // const { data } = useGetPaginatedDataQuery(page);
  // console.log("useGetPaginatedDataQuery(page)", data);

  // useEffect(() => {
  //   console.log("Will Run for first Time");
  //   dispatch(fetchBooks(1));
  // }, [dispatch]);

  const handleEditModal = useCallback(() => {
    dispatch(openEditModalAction());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage && openEditModal) {
      setTimeout(() => handleEditModal(), 1000);
    }
  }, [successMessage, openEditModal, handleEditModal]);

  const setEditBookDetails = (book) => {
    setEditBook(book);
    handleEditModal();
  };

  const handleSubmit = useCallback(
    (bookDetails) => {
      dispatch(updateBook(bookDetails));
    },
    [dispatch]
  );

  return (
    <div className="container">
      {errorMessage && (
        <div className="text-danger d-flex justify-content-start">
          {errorMessage}
        </div>
      )}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {/* {bookList.map((book) => (
          <div className="col">
            <BookCard bookDetails={book} editBook={setEditBookDetails} />
          </div>
        ))} */}
      </div>
      {openEditModal && (
        <ModalComponent
          showModal={openEditModal}
          handleModalClose={handleEditModal}
          modalTitle="Edit Book Details"
          bookDetails={editBook}
          onSubmit={handleSubmit}
        />
      )}
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
};

export default BookList;

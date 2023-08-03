import React, { useCallback, useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetBooksQuery, usePutBookMutation } from "../../feature/bookApis";
import BookCard from "../BookCard/BookCard";
import {
  openEditModalAction,
  setBookList,
  setErrorMessage,
  setSuccessMessage,
  setTotalPage,
} from "../../feature/bookSlice";
import ModalComponent from "../../sharedComponents/ModalComponent";
import { Pagination } from "../Pagination/Pagination";
import { filterArrayFunc, sortedArrayFunc } from "../../utils/utils";
import { ErrorMessage, InfoMessage } from "../../sharedComponents/Message";

const SortedArrayComponent = ({ array, setEditBookDetails }) => {
  return (
    <>
      {array.map((book) => (
        <div className="col">
          <BookCard bookDetails={book} editBook={setEditBookDetails} />
        </div>
      ))}
    </>
  );
};
const BookList = () => {
  const dispatch = useDispatch();
  const scrollRef = createRef();
  const {
    openEditModal,
    errorMessage,
    page,
    totalPages,
    title,
    bookList,
    sortBy,
    filterObject,
    sortedArrayKey,
  } = useSelector((state) => state.books);
  const [editBook, setEditBook] = useState({});

  const { data, isLoading } = useGetBooksQuery({ page, title, sortBy });
  const [mutation] = usePutBookMutation();

  const [sortedArray, setSortedArray] = useState([]);

  // Set book List
  useEffect(() => {
    if (data?.data) {
      dispatch(setBookList(data.data));
    }
  }, [data, dispatch]);

  // Sorting Logic
  useEffect(() => {
    if (sortedArrayKey === "sort") {
      if (sortBy !== "default") {
        const array = [...bookList];
        const sortArray = sortedArrayFunc(array, sortBy);
        setSortedArray(sortArray);
      } else {
        setSortedArray([]);
      }
    }
  }, [bookList, sortBy, dispatch, sortedArrayKey]);

  // Filtering Logic
  useEffect(() => {
    if (sortedArrayKey === "filter") {
      if (Object.keys(filterObject).length) {
        const array = [...bookList];
        const sortArray = filterArrayFunc(array, filterObject);
        if (!sortArray.length) {
          dispatch(setErrorMessage("No data found for the give filter!!!"));
        } else {
          setSortedArray(sortArray);
        }
      } else {
        setSortedArray([]);
      }
    }
  }, [filterObject, bookList, dispatch, sortedArrayKey]);

  // Setting total Page
  useEffect(() => {
    if (!isLoading && page === 1) {
      dispatch(setTotalPage(data.pagination.totalPages));
    }
  }, [isLoading, page, dispatch, data]);

  // Open Edit Modal
  const handleEditModal = useCallback(() => {
    dispatch(openEditModalAction());
  }, [dispatch]);

  // Set book which need to Edit
  const setEditBookDetails = (book) => {
    setEditBook(book);
    handleEditModal();
  };

  // On Edit Sumbit Click
  const handleSubmit = useCallback(
    async (bookDetails) => {
      try {
        const response = await mutation(bookDetails);
        if (response?.error) {
          dispatch(setErrorMessage(response.error.data.message));
        } else {
          dispatch(setSuccessMessage("Book is update Successfully!!"));
          setTimeout(() => handleEditModal(), 1000);
        }
      } catch (error) {
        dispatch(setErrorMessage("Failed to add new Book!!!"));
      }
    },
    [mutation, dispatch, handleEditModal]
  );

  return (
    <div className="container mt-3">
      {isLoading ? (
        <div className="text-warning d-flex justify-content-center">
          ...loading
        </div>
      ) : (
        <div ref={scrollRef}>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <SortedArrayComponent
              array={sortedArray.length !== 0 ? sortedArray : bookList}
              setEditBookDetails={setEditBookDetails}
            />
          </div>
          {bookList.length === 0 && (
            <InfoMessage message="Sorry, No Data found!!!" />
          )}
          {openEditModal && (
            <ModalComponent
              showModal={openEditModal}
              handleModalClose={handleEditModal}
              modalTitle="Edit Book Details"
              bookDetails={editBook}
              onSubmit={handleSubmit}
            />
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            scrollRef={scrollRef}
          />
        </div>
      )}
    </div>
  );
};

export default BookList;

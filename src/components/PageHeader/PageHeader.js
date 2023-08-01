import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddModalAction } from "../../feature/bookSlice";
import ModalComponent from "../../sharedComponents/ModalComponent";
import { addBook, updateBook } from "../../feature/bookApis";

export const PageHeader = () => {
  const dispatch = useDispatch();
  const { openAddModal, successMessage } = useSelector((state) => state.books);

  const handleAddModal = useCallback(() => {
    dispatch(openAddModalAction());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage && openAddModal) {
      setTimeout(() => handleAddModal(), 1000);
    }
  }, [openAddModal, successMessage, handleAddModal]);

  const handleSubmit = useCallback(
    (bookDetails) => {
      dispatch(addBook(bookDetails));
    },
    [dispatch]
  );

  return (
    <div className="container py-5 text-center">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light"> Book Store</h1>
          <p className="lead text-body-secondry">
            This is book store webapp where you can add new book, update book,
            search book and filter book
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
            <input
              className="form-control"
              type="search"
              placeholder="Search book by title"
            />
          </div>
          <ul className="nav nav-pills">
            <li>
              <button className="btn btn-outline-primary m-1">Filter</button>
            </li>
            <li>
              <button className="btn btn-primary m-1">Sort</button>
            </li>
            <li>
              <button
                className="btn btn-primary m-1"
                onClick={() => dispatch(openAddModalAction())}
              >
                Add new book
              </button>
            </li>
          </ul>
        </div>
      </div>
      {openAddModal && (
        <ModalComponent
          showModal={openAddModal}
          handleModalClose={handleAddModal}
          modalTitle="Add Book Details"
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

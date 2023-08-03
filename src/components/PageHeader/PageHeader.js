import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  openAddModalAction,
  setErrorMessage,
  setSortBy,
  setSortedArrayKey,
  setSuccessMessage,
} from "../../feature/bookSlice";
import ModalComponent from "../../sharedComponents/ModalComponent";
import { usePostBookMutation } from "../../feature/bookApis";
import { setSearchText } from "../../feature/bookSlice";
import { FilterSidebar } from "../../sharedComponents/FilterSidebar";
import { Button } from "../../sharedComponents/Button";

import "./pageHeader.css";

export const PageHeader = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { openAddModal, sortBy } = useSelector((state) => state.books);
  const [mutation] = usePostBookMutation();

  // handle Open add modal
  const handleAddModal = useCallback(() => {
    dispatch(openAddModalAction());
  }, [dispatch]);

  // handle search value
  const handleSearchValueChanges = (value) => {
    if (!value) {
      dispatch(setSearchText(""));
      setSearchValue("");
    } else {
      setSearchValue(value);
    }
  };

  // handle Add new submit
  const handleSubmit = useCallback(
    async (bookDetails) => {
      try {
        const response = await mutation(bookDetails);
        if (response?.error) {
          dispatch(setErrorMessage(response.error.data.message));
        } else {
          dispatch(setSuccessMessage("Book is added Successfully!!"));
          setTimeout(() => handleAddModal(), 1000);
        }
      } catch (error) {
        dispatch(setErrorMessage("Failed to add new Book!!!"));
      }
    },
    [mutation, dispatch, handleAddModal]
  );

  // handle on sort button click
  const handleSortByFun = (value) => {
    dispatch(setSortedArrayKey("sort"));
    dispatch(setSortBy(value));
  };

  // handle enter click on search input
  const handleOnEnterKey = (event) => {
    if (event.code === "Enter") {
      dispatch(setSearchText(searchValue));
    }
  };

  return (
    <div className="imagesHeader bg-image img-fluid">
      <div className="container py-3 text-center">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <div className="page-heading">
              <span className="book-style">Book</span>
              <span className="store-style">Store</span>
            </div>
            <p className="lead text-body-secondry">
              This is book store webapp where you can add new book, update book,
              search book and filter book
            </p>
          </div>
        </div>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center py-3 mb-4">
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
              <input
                className="form-control"
                type="search"
                placeholder="Search book by title"
                value={searchValue}
                onKeyDown={(e) => handleOnEnterKey(e)}
                onChange={(e) => handleSearchValueChanges(e.target.value)}
              />
              <Button
                className="btn-dark m-1"
                onClick={() => dispatch(setSearchText(searchValue))}
                buttonName="Search"
              />
            </div>
            <ul className="nav nav-pills">
              <li>
                <FilterSidebar />
              </li>
              <li>
                <select
                  class="form-select my-1"
                  value={sortBy}
                  onChange={(e) => handleSortByFun(e.target.value)}
                >
                  <option value="pages">Sort By: Pages</option>
                  <option value="year">Sort By: Year</option>
                  <option value="default" selected>
                    Sort By: Default
                  </option>
                </select>
              </li>
              <li>
                <Button
                  className="btn-dark m-1"
                  onClick={() => dispatch(openAddModalAction())}
                  buttonName="Add new book"
                />
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
            successMessage=""
          />
        )}
      </div>
    </div>
  );
};

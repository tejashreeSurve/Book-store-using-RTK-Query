import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNextPage, setPage, setPreviosPage } from "../../feature/bookSlice";
import { fetchBooks } from "../../feature/bookApis";
import { useGetPaginatedDataQuery } from "../../feature/bookApis";
export const Pagination = ({ page,totalPages }) => {
  const dispatch = useDispatch();

  return (
    <div className="container py-3 d-flex justify-content-center">
      <nav>
        <ul className="pagination pagination-lg">
          <li class="page-item m-2 ">
            <button
              className="page-link rounded shadow-sm"
              onClick={() => dispatch(setPreviosPage())}
              disabled={page === 1}
            >
              &laquo;
            </button>
          </li>
          <li class="page-item m-2">
            <button className="page-link rounded shadow-sm" disabled={true}>
              {page}
            </button>
          </li>
          <li class="page-item m-2">
            <button
              className="page-link rounded shadow-sm"
              onClick={() => dispatch(setNextPage())}
              disabled={page === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

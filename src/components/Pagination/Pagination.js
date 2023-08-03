import React from "react";
import { useDispatch } from "react-redux";
import { setNextPage, setPreviosPage } from "../../feature/bookSlice";
import { Button } from "../../sharedComponents/Button";

export const Pagination = ({ page, totalPages, scrollRef }) => {
  const dispatch = useDispatch();

  // handle scroll up
  const handleScrollUp = () => {
    scrollRef.current.scrollIntoView();
  };

  // handle Previous Page click
  const handlePreviousPage = () => {
    dispatch(setPreviosPage());
    handleScrollUp();
  };

  // handle next page click
  const handleNextPage = () => {
    dispatch(setNextPage());
    handleScrollUp();
  };
  return (
    <div className="container py-3 d-flex justify-content-center">
      <nav>
        <ul className="pagination pagination-lg">
          <li class="page-item m-2 ">
            <Button
              className="rounded shadow-sm"
              type={"pageLink"}
              onClick={handlePreviousPage}
              disabled={page === 1}
              children={<span> &laquo;</span>}
            />
          </li>
          <li class="page-item m-2">
            <Button
              className="rounded shadow-sm"
              type={"pageLink"}
              disabled={true}
              buttonName={page}
            />
          </li>
          <li class="page-item m-2">
            <Button
              className="rounded shadow-sm "
              type={"pageLink"}
              onClick={handleNextPage}
              disabled={page === totalPages}
              children={<span> &raquo;</span>}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

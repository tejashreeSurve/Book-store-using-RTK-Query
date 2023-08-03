import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setFilterObject,
  setSortBy,
  setSortedArrayKey,
} from "../feature/bookSlice";
import { Button } from "./Button";

const FilterList = ({ filterObj, filters, setFilters }) => {
  const handleOnChanges = (isChecked, key, fieldObj) => {
    if (isChecked) {
      if (!filters[key]) filters[key] = [];
      const array = filters[key];
      filters[key] = [...array, fieldObj];
      setFilters({ ...filters });
    } else {
      filters[key] = filters[key].filter((item) => item !== fieldObj);
      setFilters({ ...filters });
    }
  };

  return (
    <>
      {Object.keys(filterObj).map((key) => (
        <div className="border-bottom my-2 py-2 text-start">
          <h6 className="fw-bold text-capitalize">{key}</h6>
          <ul class="list-group list-group-flush mx-4">
            {filterObj[key].map((fieldObj) => (
              <li class="list-group-item border-0">
                <input
                  class="form-check-input me-3"
                  type="checkbox"
                  id="firstCheckbox"
                  name={fieldObj}
                  onChange={(e) =>
                    handleOnChanges(e.target.checked, key, fieldObj)
                  }
                />
                <label class="form-check-label" for="firstCheckbox">
                  {fieldObj}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export const FilterSidebar = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [show, setShow] = useState(false);

  // Paramter for filter
  const filterParamter = {
    country: ["India", "Japan", "USA"],
    language: ["English", "Hindi", "Marathi"],
    year: ["2019", "2020", "2023"],
  };

  // Hnadling close and open logic for opening SideBar
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleApplyFilter = () => {
    dispatch(setSortedArrayKey("filter"));
    dispatch(setFilterObject({ ...filters }));
    dispatch(setSortBy("default"));
    handleClose();
  };

  const handleResetFilter = () => {
    setFilters({});
    // uncheck all the checked input
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    dispatch(setSortBy("default"));
    dispatch(setFilterObject({}));
    handleClose();
  };

  return (
    <>
      <Button
        className="btn-outline-dark m-1"
        onClick={handleShow}
        buttonName="Filter"
      />

      <div
        className={`offcanvas offcanvas-start ${show ? "show" : ""}`}
        tabIndex="-1"
        id="myOffcanvas"
      >
        <div className="mx-3 offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">Filters</h5>
          <div className="d-flex">
            <Button
              style={{ marginRight: "0.5rem" }}
              className="btn-outline-dark close"
              onClick={handleApplyFilter}
              buttonName="Apply filter"
            />
            <Button
              className="close btn-dark"
              onClick={handleClose}
              children={<span>&times;</span>}
            />
          </div>
        </div>
        <div className="offcanvas-body">
          <FilterList
            filterObj={filterParamter}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="border-top py-2 mx-4 text-end">
          <Button
            style={{ marginRight: "0.5rem" }}
            className="btn-dark close"
            onClick={handleResetFilter}
            buttonName="Reset filter"
          />
        </div>
      </div>
    </>
  );
};

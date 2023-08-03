import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import { FormField } from "./FormField";
import { Button } from "./Button";
import { ErrorMessage, SuccessMessage } from "./Message";

const ModalComponent = ({
  showModal,
  handleModalClose,
  modalTitle,
  bookDetails,
  onSubmit,
}) => {
  const { successMessage, errorMessage, loading } = useSelector(
    (state) => state.books
  );
  const initialValues = {
    author: "",
    country: "",
    language: "",
    link: "",
    pages: 0,
    title: "",
    year: new Date().getFullYear(),
  };

  const validationSchema = Yup.object({
    author: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    language: Yup.string().required("Required"),
    link: Yup.string()
      .required("Required")
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "URL must be valid"
      ),
    pages: Yup.number()
      .required("Required")
      .min(1, "Pages must be greater then equal to 1"),
    title: Yup.string().required("Required"),
    year: Yup.number()
      .required("Required")
      .test(
        "len",
        "Must be exactly 4 character",
        (val) => val.toString().length === 4
      ),
  });

  const fieldArray = [
    { fieldLabel: "Title", name: "title", type: "text" },
    { fieldLabel: "Author", name: "author", type: "text" },
    { fieldLabel: "Country", name: "country", type: "text" },
    { fieldLabel: "Language", name: "language", type: "text" },
    { fieldLabel: "Link", name: "link", type: "link" },
    { fieldLabel: "Pages", name: "pages", type: "number" },
    { fieldLabel: "Year", name: "year", type: "text" },
  ];
  return (
    <div>
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          id="staticBackdrop"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <Formik
                initialValues={bookDetails ? bookDetails : initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, errors, touched, handleChange }) => (
                  <Form>
                    <>
                      <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <Button
                          className="close btn-dark"
                          onClick={handleModalClose}
                          children={<span>&times;</span>}
                        />
                      </div>
                      <div className="modal-body">
                        {successMessage && (
                          <SuccessMessage message={successMessage} />
                        )}
                        {errorMessage && (
                          <ErrorMessage message={errorMessage} />
                        )}
                        {fieldArray.map((field) => (
                          <FormField
                            formField={field}
                            values={values}
                            errors={errors}
                            handleChange={handleChange}
                            touched={touched}
                          />
                        ))}
                      </div>
                      <div className="modal-footer">
                        <Button
                          className={"btn-outline-dark"}
                          onClick={handleModalClose}
                          buttonName={"Close"}
                        />
                        <Button
                          className={"btn-dark"}
                          type="submit"
                          disabled={loading}
                          buttonName={"Submit"}
                        />
                      </div>
                    </>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={handleModalClose}></div>
      )}
    </div>
  );
};

export default ModalComponent;

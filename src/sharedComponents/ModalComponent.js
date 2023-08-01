import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormField } from "./FormField";
import { useSelector } from "react-redux";

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
    author: "jhdsg",
    country: "sjdh",
    language: "hdgsa",
    link: "shd.sjdh.sajdh",
    pages: 200,
    title: "New book",
    year: 2000,
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
      .min(100, "Pages must be greater then equal to 100"),
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
                        <button
                          type="button"
                          className="close btn btn-secondary"
                          onClick={handleModalClose}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {successMessage && (
                          <div className="text-success fw-bold d-flex justify-content-start mb-2">
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div className="text-danger fw-bold d-flex justify-content-start mb-2">
                            {errorMessage}
                          </div>
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
                        {/* </Form> */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleModalClose}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          Submit
                        </button>
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

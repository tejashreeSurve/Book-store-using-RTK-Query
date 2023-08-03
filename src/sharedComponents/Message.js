import React from "react";

export const SuccessMessage = ({ message }) => {
  return (
    <div className={`text-success fw-bold d-flex justify-content-center mb-2`}>
      {message}
    </div>
  );
};

export const ErrorMessage = ({ message }) => {
  return (
    <div className={`text-danger fw-bold d-flex justify-content-center mb-2`}>
      {message}
    </div>
  );
};

export const InfoMessage = ({ message }) => {
  return (
    <div className={`text-info fw-bold d-flex justify-content-center mb-2`}>
      {message}
    </div>
  );
};

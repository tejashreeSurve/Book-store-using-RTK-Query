import React from "react";
import { Button } from "../../sharedComponents/Button";

import "./bookCard.css";

const BookCard = ({ bookDetails, editBook }) => {
  const { author, country, language, link, pages, title, year } = bookDetails;

  return (
    <div className="card shadow-sm d-flex h-100">
      <div class="card-body d-flex flex-column">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{title}</h5>
          <h5 className="d-flex flex-row justify-content-between">
            <span>by {author}</span>
            <span>{year}</span>
          </h5>
          <p className="card-text d-flex flex-row justify-content-between">
            <span>Country : {country}</span>
            <span>Language : {language}</span>
          </p>
          <span>Pages : {pages}</span>
          <a href="eee.sjs.sdj" className="text-dark">
            {link}
          </a>
        </div>
        <Button
          className={`edit-button btn-dark mt-auto`}
          onClick={() => editBook(bookDetails)}
          buttonName="Edit"
        />
      </div>
    </div>
  );
};

export default BookCard;

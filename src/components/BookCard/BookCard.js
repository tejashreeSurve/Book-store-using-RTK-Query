import React from "react";
import "./bookCard.css";
import { useDispatch } from "react-redux";
import { openEditModalAction } from "../../feature/bookSlice";

const BookCard = ({ bookDetails, editBook }) => {
  const { author, country, language, link, pages, title, year } = bookDetails;
  return (
    <div className="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Title: {title}</h5>
        <p class="card-text">
          <h5>Author: {author}</h5>
          <h5>Country: {country}</h5>
          <h5>Language: {language}</h5>
          <h5>
            Link: <a href="eee.sjs.sdj">{link}</a>
          </h5>
          <h5>Pages: {pages}</h5>
          <h5>Year: {year}</h5>
        </p>
        <button
          class="btn btn-outline-primary"
          onClick={() => editBook(bookDetails)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default BookCard;

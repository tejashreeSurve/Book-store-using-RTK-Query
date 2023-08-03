import React from "react";

// custom button component
export const Button = ({
  children,
  buttonName,
  className,
  onClick,
  disabled = false,
  style,
  type,
}) => {
  return (
    <button
      className={` ${
        type === "pageLink" ? "page-link text-dark" : "btn"
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
      type={type}
    >
      {children && children}
      {buttonName}
    </button>
  );
};

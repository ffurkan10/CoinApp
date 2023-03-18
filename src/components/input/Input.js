import React from "react";

const Input = ({ searchTerm, handleChange }) => {
  return (
    <div className="input">
      <div className="input__container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Input;

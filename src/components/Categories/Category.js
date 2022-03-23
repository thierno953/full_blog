import React from "react";
import "./category.css";

const Category = ({ handleCategory, options }) => {
  return (
    <div className="category">
      <h4>Categories</h4>
      <ul className="category_grid">
        {options.map((item, index) => (
          <li className="item" key={index} onClick={() => handleCategory(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

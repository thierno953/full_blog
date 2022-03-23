import React from "react";
import "./pagination.css";

const Pagination = ({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalBlog,
}) => {
  const renderPagination = () => {
    if (
      (currentPage === 0 && data.length < 5) ||
      (totalBlog === pageLimit && currentPage === 0)
    )
      return null;
    if (currentPage === 0) {
      return (
        <ul className="dflex">
          <li>1</li>

          <button onClick={() => loadBlogsData(5, 10, 1)}>Next</button>
        </ul>
      );
    } else if (
      currentPage < pageLimit - 1 &&
      data.length === pageLimit &&
      totalBlog - data.length !== pageLimit
    ) {
      return (
        <ul className="dflex">
          <button
            onClick={() =>
              loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
            }
          >
            Prev
          </button>

          <li>{currentPage + 1}</li>

          <button
            onClick={() =>
              loadBlogsData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)
            }
          >
            Next
          </button>
        </ul>
      );
    } else {
      return (
        <ul className="dflex">
          <button
            onClick={() =>
              loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
            }
          >
            Prev
          </button>

          <li>{currentPage + 1}</li>
        </ul>
      );
    }
  };
  return <div>{renderPagination()}</div>;
};

export default Pagination;

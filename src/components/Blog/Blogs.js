import React from "react";
import { Link } from "react-router-dom";
import "./blogs.css";

const Blogs = ({
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  handleDelete,
}) => {
  return (
    <div className="blogs">
      <div className="blogs_card">
        <div className="blogs_flex">
          <img src={imageUrl} alt={title} />
          <div className="blog_info">
            <h4>{title}</h4>
            <h5>{category}</h5>
            <p>
              {excerpt(description)} <Link to={`/blog/${id}`}>Read More</Link>
            </p>
          {/*   <div className="icon">
              <Link to={`/editBlog/${id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(id)}
              ></i>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

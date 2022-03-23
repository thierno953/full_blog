import React, { useState, useEffect } from "react";
import "./blog.css";
import "./blogs.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { JSON_API } from "../utils";

/*eslint-disable*/
const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(`${JSON_API}/blogs/${id}`);
    const relatedPostData = await axios.get(
      `${JSON_API}/blogs?category=${response.data.category}&_start=0&_end=3`
    );

    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);

      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 60) {
      str = str.substring(0, 55) + "...";
    }
    return str;
  };

  return (
    <div className="container">
      <div className="blog_content">
        <div className="blog_f">
          <img src={blog && blog.imageUrl} alt={blog && blog.title} />
          <div className="blog_info_single">
            <span>
              <i className="fa-solid fa-calendar-days"></i> {blog && blog.date}
            </span>
            <span className="category">{blog && blog.category}</span>
          </div>
          <div className="blog_sub_info">
            <h4> {blog && blog.title}</h4>
            <p> {blog && blog.description}</p>
          </div>
        </div>
      </div>

      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && <h3 className="related">Related Post</h3>}
          <>
            {relatedPost
              .filter((item) => item.id != id)
              .map((item, index) => (
                <div className="blogs" key={index}>
                  <div className="blogs_card">
                    <div className="blogs_flex">
                      <Link to={`/blog/${item.id}`}>
                        <img src={item.imageUrl} alt={item.title} />
                      </Link>
                      <div className="blog_info">
                        <h4>{item.title}</h4>
                        <h5>{item.category}</h5>
                        <p>
                          {excerpt(item.description)}{" "}
                          <Link to={`/blog/${item.id}`}>Read More</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </>
        </>
      )}
    </div>
  );
};

export default Blog;

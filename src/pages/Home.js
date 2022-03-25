import { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import { toast } from "react-toastify";
import { JSON_API } from "../components/utils";
import Blogs from "../components/Blog/Blogs";
import Search from "../components/Search/Search";
import Category from "../components/Categories/Category";
import LatestBlog from "../components/Blog/LatestBlog";
import Pagination from "../components/Pagination/Pagination";

/*eslint-disable*/
const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [pageLimit] = useState(5);

  const options = ["STYLE", "EFFECTIVE", "ENERGY", "PROBLEMS", "STOP"];

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchLatestBlog();
  }, []);

  const loadBlogsData = async (start, end, increase, operation) => {
    const totalBlog = await axios.get(`${JSON_API}/blogs`);
    setTotalBlog(totalBlog.data.length);

    const response = await axios.get(
      `${JSON_API}/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      if (operation) {
        setCurrentPage(0);
      } else {
        setCurrentPage(currentPage + increase);
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  // delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that blog ?")) {
      const response = await axios.delete(`${JSON_API}/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        loadBlogsData(0, 5, 0, "delete");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 100) {
      str = str.substring(0, 100) + "...";
    }
    return str;
  };

  // search
  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData(0, 5, 0);
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${JSON_API}/blogs?q=${searchValue}`);
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  // categories
  const handleCategory = async (category) => {
    const response = await axios.get(`${JSON_API}/blogs?category=${category}`);
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  // latest
  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get(`${JSON_API}/blogs`);
    // setTotalBlog(totalBlog.data.length);
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(
      `${JSON_API}/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="container">
        <div className="home_flex">
          <div className="home_g">
            <>
              {data.length === 0 && <h2 className="center">No Blogs Found</h2>}
            </>
            {data &&
              data.map((item, index) => (
                <Blogs
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handleDelete={handleDelete}
                />
              ))}

            <div>
              <Pagination
                currentPage={currentPage}
                loadBlogsData={loadBlogsData}
                pageLimit={pageLimit}
                data={data}
                totalBlog={totalBlog}
              />
            </div>
          </div>
          <div className="home_sub">
            <Search
              searchValue={searchValue}
              onInputChange={onInputChange}
              handleSearch={handleSearch}
            />
            <div className="latest">
              <h4>Latest</h4>
              {latestBlog &&
                latestBlog.map((item, index) => (
                  <LatestBlog key={index} {...item} />
                ))}
            </div>
            <div className="option">
              <Category options={options} handleCategory={handleCategory} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

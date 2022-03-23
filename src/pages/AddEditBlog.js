import { useState } from "react";
import "./addEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { JSON_API } from "../components/utils";
import { useEffect } from "react";

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

/*eslint-disable*/

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [titleErrMsg, setTitleErrMsg] = useState(null);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [descriptionErrMsg, setDescriptionErrMsg] = useState(null);
  const { title, description, category, imageUrl } = formValue;
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`${JSON_API}/blogs/${id}`);
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Something went wrong");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyy;
    return today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please select a category");
    }
    if (!title) {
      setTitleErrMsg("Please select a title");
    }
    if (!description) {
      setDescriptionErrMsg("Please select a Description");
    }
    const imageValidation = !editMode ? imageUrl : true;

    if (title && description && imageUrl && category) {
      const currentDate = getDate();

      if (!editMode) {
        const updatedBlogData = { ...formValue, date: currentDate };
        const response = await axios.post(`${JSON_API}/blogs`, updatedBlogData);
        if (response.status === 201) {
          toast.success("Blog Created Successfully!");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const response = await axios.put(`${JSON_API}/blogs/${id}`, formValue);
        if (response.status === 200) {
          toast.success("Blog Updated Successfully!");
        } else {
          toast.error("Something went wrong");
        }
      }

      setFormValue({ title: "", description: "", category: "", imageUrl: "" });
      navigate("/");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pm8waxse");
    axios
      .post("http://api.cloudinary.com/v1_1/barrysto/image/upload", formData)
      .then((resp) => {
        toast.info("Image Upload Successfully");
        setFormValue({ ...formValue, imageUrl: resp.data.url });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <>
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>{editMode ? "Update Blog" : "Add Blog"}</p>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title || ""}
                name="title"
                onChange={onInputChange}
              />
              {titleErrMsg && (
                <div className="categoryErrorMsg">{titleErrMsg}</div>
              )}
              <br />
              <textarea
                cols="30"
                rows="10"
                name="description"
                placeholder="Description"
                value={description || ""}
                onChange={onInputChange}
              ></textarea>
              {descriptionErrMsg && (
                <div className="categoryErrorMsg">{descriptionErrMsg}</div>
              )}
              <br />
              {!editMode && (
                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple
                    required
                    onChange={(e) => onUploadImage(e.target.files[0])}
                  />
                </div>
              )}
              <br />
              <select
                className="categoryDropdown"
                onChange={onCategoryChange}
                value={category}
              >
                <option>Please select category</option>
                {options.map((option, index) => (
                  <option value={option || ""} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              {categoryErrMsg && (
                <div className="categoryErrorMsg">{categoryErrMsg}</div>
              )}
              <br />
              <button type="submit" className="primary-btn">
                {editMode ? "Update" : "Add"}
                <i className="fa fa-long-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEditBlog;

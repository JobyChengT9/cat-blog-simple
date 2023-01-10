import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import "./write.scss";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : state?.img,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["clean"],
    ],
  };

  const topics = ["SOCIAL", "HEALTH", "BEHAVIOUR", "ADOPTION"];

  return (
    <div className="write">
      <div className="content">
        <div
          className="coverImg"
          style={{
            backgroundImage: file
              ? `url(${URL.createObjectURL(file)})`
              : state?.img
              ? `url(../upload/${state?.img})`
              : "",
          }}
        >
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Cover Image
          </label>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            modules={modules}
            placeholder={"Write something about your cat..."}
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="category">
          <h1>Category</h1>
          <div className="container">
            {topics.map((topic) => (
              <div className="cat" key={topic}>
                <input
                  type="radio"
                  checked={cat === topic}
                  name={topic}
                  id={topic}
                  onChange={(e) => setCat(topic)}
                />
                <label htmlFor={topic}>{topic}</label>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleClick}>Publish</button>
      </div>
    </div>
  );
};

export default Write;

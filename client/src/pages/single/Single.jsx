import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import Recommend from "../../components/Recommend";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import defaultIcon from "../../img/cat_icon.jpg";
import "./single.scss";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="single">
      <div className="post">
        <img src={`../upload/${post?.img}`} alt="cover" />
        <div className="user">
          <img
            src={post.userImg ? `../../upload/${post.userImg}` : defaultIcon}
            alt="icon"
          />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="edit post" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="delete post" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        />
      </div>
      <Recommend cat={post.cat} />
    </div>
  );
};

export default Single;

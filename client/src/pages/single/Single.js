import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Recommend from "../../components/Recommend";
import moment from "moment";
import DOMPurify from "dompurify";
import { db } from "../../db";
import "./single.scss";

const Single = () => {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPost(db[postId - 1]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="single">
      <div className="post">
        <img src={post.img} alt="cover" />
        <div className="user">
          <img src={post.userImg} alt="icon" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
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

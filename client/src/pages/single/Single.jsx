import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Recommend from "../../components/Recommend";
import moment from "moment";
import DOMPurify from "dompurify";
import "./single.scss";
import { db } from "../../db";

const Single = () => {
  console.log(db[0]);

  const [post, setPost] = useState([]);

  const location = useLocation();

  const postId = location.pathname.split("/")[3];
  console.log(db[postId]);
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
  console.log(post);

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

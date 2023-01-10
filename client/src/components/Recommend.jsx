import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Recommend = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === parseInt(postId)) {
            delete data[i];
          }
        }
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat, postId]);

  return (
    <div className="recommend">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
          <Link className="link" to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Recommend;

import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { db } from "../db";

const Recommend = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < db.length; i++) {
          if (i === postId - 1) {
            continue;
          }
          if (db[i].cat === cat) {
            data.push(db[i]);
          }
        }
        setPosts(data.reverse());
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat,postId]);

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

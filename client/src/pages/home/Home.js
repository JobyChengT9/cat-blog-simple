import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { db } from "../../db";
import "./home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search.split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cat === undefined) {
          const data = db;
          setPosts(data);
        } else {
          const data = [];
          for (let i = 0; i < db.length; i++) {
            if (db[i].cat === cat) {
              data.push(db[i]);
            }
          }
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="decoImg">
        <p>Everyday is Caturday</p>
      </div>
      <h1 className="new" style={{ margin: "20px" }}>
        🐾 What's New 🐾
      </h1>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link className="link post" to={`/cat-blog-simple/post/${post.id}`}>
              <img src={post.img} alt="" />
              <div className="content">
                <div>
                  <span style={{ fontSize: "18px" }}>{post.cat}</span>
                  <span style={{ fontStyle: "italic" }}>
                    Posted {moment(post.date).fromNow()}
                  </span>
                </div>
                <h1>{post.title}</h1>
                <p>{getText(post.desc)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

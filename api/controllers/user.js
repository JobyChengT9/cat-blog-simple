import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const changeIcon = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const userId = req.params.id;
    const icon = req.body.img;
    const q = "UPDATE users SET `img`=? WHERE `id` = ?";

    db.query(q, [icon, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Icon has been updated.");
    });
  });
};

//   export const changePassword = (req, res) => {
//
//   };

import express from "express";
import { changeIcon } from "../controllers/user.js";

const router = express.Router();

router.put("/:id", changeIcon);

export default router;

import {Router} from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post.controller.js";

const router = Router();

router.post("/", createPost);
router.post("/create", createPost);
router.get("/", getAllPosts);
router.get("/getAllPosts", getAllPosts);
router.get("/:id", getPostById);
router.put("/update/:id", updatePost);
router.put("/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.delete("/:id", deletePost);

export default router;
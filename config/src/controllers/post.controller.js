import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body ?? {};
        if (!name || !description || age === undefined || age === null) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const post = await Post.create({ name, description, age });
        return res.status(201).json(post);
    } catch (error) {
        console.error("Error creating post:", error);

        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                message: "Invalid post data",
                errors: Object.values(error.errors).map(({ path, message }) => ({
                    field: path,
                    message,
                })),
            });
        }

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                message: "Invalid post data",
                field: error.path,
                details: error.message,
            });
        }

        return res.status(500).json({ message: "Error creating post" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: "Error fetching posts" });
    }
};

const getPostById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ message: "Error fetching post" });
    }
};

const updatePost = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const { name, description, age } = req.body;
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (age !== undefined) updates.age = age;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Provide at least one field to update" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ message: "Error updating post" });
    }
};

const deletePost = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Error deleting post" });
    }
};

export { createPost, deletePost, getAllPosts, getPostById, updatePost };

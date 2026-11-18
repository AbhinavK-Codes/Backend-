import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120,
    },
}, {
    timestamps: true,
});

export const Post = mongoose.model("Post", postSchema);

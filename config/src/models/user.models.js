import mongoose , { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // lily y
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
}, {
    timestamps: true,
});

//before saving the user, hash the password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
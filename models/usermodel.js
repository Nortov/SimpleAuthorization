import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model("User", UserSchema);

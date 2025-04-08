import mongoose, { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const ContentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, required: true }, // Remove enum validation here
  title: { type: String, required: true },
  tags: [{ type: String, ref: "Tags", required: true }],
  UserId: { type: Types.ObjectId, ref: "Users", required: true },
});


const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
});

export const UserModel = model("Users", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);

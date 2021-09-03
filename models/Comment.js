const { model, Schema, Types } = require("mongoose")

const Comment = new Schema({
  postId: { type: Types.ObjectId, ref: "Post" },
  author: { type: Types.ObjectId, ref: "User" },
  desc: { type: String, required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }]
}, { timestamps: true })

module.exports = model("Comment", Comment)
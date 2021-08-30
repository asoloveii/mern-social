const { model, Schema, Types } = require('mongoose')

const Post = new Schema({
  author: { type: Types.ObjectId, ref: "User" },
  desc: { type: String },
  picture: { type: String, default: "" },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  comments: [{ type: Types.ObjectId, ref: "Comment" }]
}, { timestamps: true })

module.exports = model("Post", Post)
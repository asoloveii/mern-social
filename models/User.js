const { mode, Schema, Types } = require("mongoose")

const User = new Schema({
  name: {
    firstname: { type: String, required: [true, "First name is required"] },
    lastname: { type: String, required: [true, "Last name is required"] }
  },
  photo: {
    coverPic: { type: String, default: "" },
    profilePic: { type: String, default: "" }
  },
  desc: { type: String, default: "" },
  age: { type: Number },
  friends: [{ type: Types.ObjectId }],
  birthday: { type: Date, required: false },
}, { timestamps: true })

module.exports = model("User", User)
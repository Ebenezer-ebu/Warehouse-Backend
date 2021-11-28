const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "worker"],
      default: "worker",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

module.exports = { User };

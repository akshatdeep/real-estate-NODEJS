const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "agent"],
  },
});

user.plugin(plm);

const users = mongoose.model("Users", user);

module.exports = users;

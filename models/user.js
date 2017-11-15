const mongoose = require("./index").mongoose;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password_digest: {
    type: String,
    required: true
  },
  language: {
    type: String,
    require: true
  },
  language_code: {
    type: String,
    require: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

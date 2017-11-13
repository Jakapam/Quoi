const mongoose = require("./index").mongoose;

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 35
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

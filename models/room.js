const mongoose = require("./index").mongoose;
const messageSchema = require("./message").messageSchema;

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 35
  },
  messages: [messageSchema]
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

const mongoose = require("./index").mongoose;

const messageSchema = mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = { messageSchema, Message };

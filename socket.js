const Translate = require("@google-cloud/translate");
const projectId = "chatsy-184715";
const translate = new Translate({
  projectId: projectId
});
const translateFn = require("./translate");
const languagesToTransmit = ["en"];
const Room = require("./models/room");
const User = require("./models/user");
var room;

Room.findOne({ name: "Room1" }, (err, foundRoom) => {
  if (err) {
    room = new Room({ name: "Room1" });
    room.findOne;
  } else {
    room = foundRoom;
  }
});

var users = [];

module.exports = io => {
  io.on("connection", client => {
    console.log("client connected");

    client.on("join-room", joinRoomInfo => {
      console.log(joinRoomInfo);

      client.language = joinRoomInfo.language;
      client.username = joinRoomInfo.username;
      client.languageCode = joinRoomInfo.languageCode;

      users.push({
        username: client.username,
        language: client.language,
        languageCode: client.languageCode
      });

      Room.find({ name: "Room1" }, "messages", (err, messages) => {
        let incomingMsgs = messages[0].messages.filter(msg => {
          return msg.sender !== client.username;
        });

        let bulkMsgsToSend = [];

        incomingMsgs.forEach(msg => {
          translateFn(translate, msg.content, client.languageCode).then(
            results => {
              const translation = results[0];
              const translatedMsg = {
                sender: msg.sender,
                content: `${translation}`,
                timestamp: msg.timestamp
              };
              bulkMsgsToSend.push(translatedMsg);
              if (bulkMsgsToSend.length === incomingMsgs.length) {
                client.emit("bulkMsgs", bulkMsgsToSend);
              }
            }
          );
        });
      });

      let joinMessage = `${client.username} has joined the room`;
      let timeNow = Date.now();
      console.log(joinMessage);

      languagesToTransmit.forEach(lang => {
        translateFn(translate, joinMessage, lang).then(results => {
          const translation = results[0];
          const translatedMsg = {
            sender: "SYSTEM",
            content: `${translation}`,
            timestamp: timeNow
          };
          client.broadcast.emit(`system-${lang}`, translatedMsg);
        });
      });

      io.emit("userlist", users);
    });

    client.on("chatMsgServer", msg => {
      console.log("msg received: ", msg);
      room.messages.push(msg);
      room.save();
      languagesToTransmit.forEach(lang => {
        translateFn(translate, msg.content, lang).then(results => {
          const translation = results[0];
          const translatedMsg = Object.assign({}, msg, {
            content: `${translation}`
          });
          client.broadcast.emit(`chatMsg-${lang}`, translatedMsg);
        });
      });
    });

    client.on("setLanguage", language => {
      if (!languagesToTransmit.includes(language.code)) {
        languagesToTransmit.push(language.code);
      }

      let setLangMessage = `Now receiving messages in ${language.name}`;
      let timeNow = Date.now();
      console.log(setLangMessage);

      translateFn(translate, setLangMessage, language.code).then(results => {
        const translation = results[0];
        const translatedMsg = {
          sender: "SYSTEM",
          content: `${translation}`,
          timestamp: timeNow
        };
        client.emit(`system-${language.code}`, translatedMsg);
      });

      client.language = language.name;
      client.languageCode = language.code;
      users.forEach(user => {
        if (user.username === client.username) {
          user.language = client.language;
        }
      });
      io.emit("userlist", users);

      User.findOne({ username: client.username }, (err, user) => {
        if (user) {
          user.language = client.language;
          user.language_code = client.languageCode;
          user.save();
        }
      });
    });

    client.on("disconnect", () => {
      let leaveMessage = `${client.username} has left the room`;
      let timeNow = Date.now();
      languagesToTransmit.forEach(lang => {
        translateFn(translate, leaveMessage, lang).then(results => {
          const translation = results[0];
          const translatedMsg = {
            sender: "SYSTEM",
            content: `${translation}`,
            timestamp: timeNow
          };
          io.emit(`system-${lang}`, translatedMsg);
        });
      });
      users = users.filter(user => user.username !== client.username);
      io.emit("userlist", users);
      console.log("client disconnected");
    });
  });
};

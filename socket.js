const Translate = require("@google-cloud/translate");
const projectId = "chatsy-184715";
const translate = new Translate({
  projectId: projectId
});
const translateFn = require("./translate");
const languagesToTransmit = ["en"];

var usernames = [];

module.exports = io => {
  io.on("connection", client => {
    console.log("client connected");

    client.on("join-room", clientRoom => {
      console.log(clientRoom);
      client.username = clientRoom.username;
      usernames.push(client.username);

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
          io.emit(`system-${lang}`, translatedMsg);
        });
      });

      io.emit("userlist", usernames);
    });

    client.on("chatMsgServer", msg => {
      console.log("msg received: ", msg);

      languagesToTransmit.forEach(lang => {
        translateFn(translate, msg.content, lang).then(results => {
          const translation = results[0];
          const translatedMsg = Object.assign({}, msg, {
            content: `${translation}`,
            timestamp: Date.now()
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

      client.language = language.code;
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
      usernames = usernames.filter(username => username !== client.username);
      io.emit("userlist", usernames);
      console.log("client disconnected");
    });
  });
};

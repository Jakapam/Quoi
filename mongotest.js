const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to DB");

  var kittySchema = mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function() {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  var Kitten = mongoose.model("Kitten", kittySchema);

  var silence = new Kitten({ name: "Silence" });
  console.log(silence.name);

  var fluffy = new Kitten({ name: "fluffy" });
  fluffy.speak();

  fluffy.save(function(err, fluffy) {
    if (err) fluffy.speak();
  });

  Kitten.find({ name: /fluffy/ }, function(err, kittens) {
    console.log(kittens);
  });
});

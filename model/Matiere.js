var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  nom: String,
  pathPhoto: String,
  pathProf: String,
});

module.exports = mongoose.model("Matiere", UserSchema);

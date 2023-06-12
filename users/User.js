var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  nom: String,
  mdp: String,
  admin: Boolean,
  token: string,
});

module.exports = mongoose.model("User", UserSchema);

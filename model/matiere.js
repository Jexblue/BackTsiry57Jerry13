var mongoose = require("mongoose");
var MatiereSchema = new mongoose.Schema({
  nom: String,
  pathPhoto: String,
  pathProf: String,
});

module.exports = mongoose.model("matieres", MatiereSchema);

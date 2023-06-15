var mongoose = require("mongoose");
var EtudiantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  pathPhoto: String,
});

module.exports = mongoose.model("etudiant", EtudiantSchema);

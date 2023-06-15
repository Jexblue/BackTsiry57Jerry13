var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    pathPhoto: String,
});

module.exports = mongoose.model("Etudiant", UserSchema);

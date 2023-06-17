let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
  dateDeRendu: Date,
  rendu: Boolean,
  auteur: {
    type: Schema.Types.ObjectId,
    ref: "etudiants",
  },
  matiere: {
    type: Schema.Types.ObjectId,
    ref: "matieres",
  },
  note: Number,
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel,
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche
module.exports = mongoose.model("assignments", AssignmentSchema);

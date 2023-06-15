let matieres = require("../model/matiere");

function postMatiere(req, res) {
  let matiere = new Matiere();
  matiere.nom = req.nom;
  matiere.pathPhoto = req.pathPhoto;
  matiere.pathProf = req.pathProf;
  matiere.save((err) => {
    if (err) {
      res.send("cant post etudiant ", err);
    }
    res.json({ message: `${etudiant.nom} saved!` });
  });
}

module.exports = {
  postMatiere,
};

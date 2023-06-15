let etudiant = require("../model/etudiant");

function postEtudiant(req, res) {
  let etudiant = new Etudiant();
  etudiant.nom = req.nom;
  etudiant.prenom = req.prenom;
  etudiant.pathPhoto = req.pathPhoto;
  etudiant.save((err) => {
    if (err) {
      res.send("cant post etudiant ", err);
    }
    res.json({ message: `${etudiant.nom} saved!` });
  });
}

module.exports = {
  postEtudiant,
};

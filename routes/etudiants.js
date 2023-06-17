let Etudiant = require("../model/etudiant");

function deleteAll(req, res) {
  Etudiant.deleteMany((err, success) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `all etudiants deleted` });
  });
}

function postEtudiant(req, res) {
  let etudiant = new Etudiant();
  const data = req.body;
  etudiant.nom = data.nom;
  etudiant.prenom = data.prenom;
  etudiant.pathPhoto = data.pathPhoto;
  etudiant.save((err) => {
    if (err) {
      res.send("cant post etudiant ", err);
    }
    res.json({ message: `${etudiant.nom} saved!` });
  });
}

function getEtudiantSansPagination(req, res) {
  Etudiant.find((err, etudiants) => {
    if (err) {
      res.send(err);
    }
    res.send(etudiants);
  });
}
module.exports = {
  postEtudiant,
  getEtudiantSansPagination,
  deleteAll,
};

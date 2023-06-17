const { success } = require("newrelic/lib/collector/response");
let Matiere = require("../model/matiere");

function postMatiere(req, res) {
  let matiere = new Matiere();
  const data = req.body;
  matiere.nom = data.nom;
  matiere.pathPhoto = data.pathPhoto;
  matiere.pathProf = data.pathProf;
  matiere.save((err) => {
    if (err) {
      res.send("cant post matiere ", err);
    }
    res.json({ message: `${matiere.nom} saved!` });
  });
}

function getMatiereSansPagination(req, res) {
  Matiere.find((err, matieres) => {
    if (err) {
      res.send(err);
    }
    res.send(matieres);
  });
}

function deleteAll(req, res) {
  Matiere.deleteMany((err, success) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `all matieres deleted` });
  });
}

module.exports = {
  postMatiere,
  getMatiereSansPagination,
  deleteAll,
};

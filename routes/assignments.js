const assignment = require("../model/assignment");
let Assignment = require("../model/assignment");

// Récupérer tous les assignments (GET)
function getAssignmentsSansPagination(req, res) {
  Assignment.find((err, assignments) => {
    if (err) {
      res.send(err);
    }

    res.send(assignments);
  });
}

// function getAssignments(req, res) {
//   var aggregateQuery = Assignment.aggregate();

//   Assignment.aggregatePaginate(
//     aggregateQuery,
//     {
//       page: parseInt(req.query.page) || 1,
//       limit: parseInt(req.query.limit) || 10,
//       populate: ["auteur", "matiere"],
//     },
//     (err, assignments) => {
//       if (err) {
//         res.send(err);
//       }
//       res.send(assignments);
//     }
//   );
// }

// Récupérer un assignment par son id (GET)
// function getAssignment(req, res) {
//   let assignmentId = req.params.id;

//   Assignment.findOne({ id: assignmentId }, (err, assignment) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(assignment);
//   });
// }

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let newassignment = new Assignment();
  const data = req.body;
  newassignment.dateDeRendu = data.dateDeRendu;
  newassignment.rendu = data.rendu;
  newassignment.auteur = data.auteur;
  newassignment.matiere = data.matiere;
  newassignment.note = data.note;
  newassignment.dateLimite = data.dateLimite;

  newassignment.save((err) => {
    if (err) {
      res.send("cant post assignment ", err);
    }
    res.json({ message: `${newassignment.dateLimite} saved!` });
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log("UPDATE recu assignment : ");
  console.log(req.body);

  Assignment.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, assignment) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: assignment.nom + "updated" });
      }

      // console.log('updated ', assignment)
    }
  );
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

function deleteAll(req, res) {
  Assignment.deleteMany((err, success) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `all assignments deleted` });
  });
}

function getAssignment(req, res) {
  let assignmentId = req.params.id;
  console.log(assignmentId);
  Assignment.findOne({ _id: assignmentId })
    .populate("auteur")
    .populate("matiere")
    .exec((err, assignment) => {
      if (err) {
        res.send(err);
      } else {
        console.log(assignment);
        res.json(assignment);
      }
    });
}

function getAssignments(req, res) {
  var aggregateQuery = Assignment.aggregate();
  aggregateQuery.lookup({
    from: "etudiants",
    localField: "auteur",
    foreignField: "_id",
    as: "auteur",
  });

  aggregateQuery.lookup({
    from: "matieres",
    localField: "matiere",
    foreignField: "_id",
    as: "matiere",
  });
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

function getAssignmentRendus(req, res) {
  var aggregateQuery = Assignment.aggregate();
  var isRendu = true;
  if (req.params.isRendu == "false") {
    isRendu = false;
  }
  aggregateQuery.match({ rendu: isRendu });
  aggregateQuery.lookup({
    from: "etudiants",
    localField: "auteur",
    foreignField: "_id",
    as: "auteur",
  });

  aggregateQuery.lookup({
    from: "matieres",
    localField: "matiere",
    foreignField: "_id",
    as: "matiere",
  });
  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}

module.exports = {
  getAssignments,
  postAssignment,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  deleteAll,
  getAssignmentRendus,
};

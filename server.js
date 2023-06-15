let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let assignment = require("./routes/assignments");
let matiere = require("./routes/matieres");
let etudiant = require("./routes/etudiants");

let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const { API_PORT } = process.env;
// const port = process.env.PORT || API_PORT;

const { MONGO_URI } = process.env;

//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
// const uri =
// "mongodb+srv://root:root@cluster0.zeny8.mongodb.net/assignments?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://root:root@cluster0.zeny8.mongodb.net/assignments?retryWrites=true&w=majority";
const port = 8010;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log(
      "vérifiez with http://localhost:8010/api/assignments que cela fonctionne"
    );
  },
  (err) => {
    console.log("Erreur de connexion: ", err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// les routes
const prefix = "/api";

app
  .route(prefix + "/assignments")
  .get(assignment.getAssignments)
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

app
  .route(prefix + "/assignments/:id")
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + "/matieres").post(matiere.postMatiere);

app.route(prefix + "/etutiants").post(etudiant.postEtudiant);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log("Serveur démarré sur http://localhost:" + port);

module.exports = app;

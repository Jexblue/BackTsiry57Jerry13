const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
// const auth = require("./middleware/auth");

// creation de user
async function postUser(req, res) {
  try {
    // Get user input
    const { nom, mdp, admin } = req.body;

    // Validate user input
    if (!(nom && mdp && admin)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ nom });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(mdp, 10);

    // Create user in our database
    const user = await User.create({
      nom,
      mdp: encryptedPassword,
      admin,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, nom, admin },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

//login

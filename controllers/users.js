const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const {USERS} = require("../utils/users");
const {CODES} = require("../utils/confirmationCodes");
const saltRounds = 10;

exports.listUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    res.json(USERS);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocurrió un error al recuperar los usuarios.",
      error,
    });
  }
};

exports.createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/CreateUser' }
  } */
  try {
    const userPayload = req.body;
    const newUser = { 
      email: userPayload.email,
      password: await bcrypt.hash(userPayload.password, saltRounds),
    };
    console.log(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message:
        "Ocurrió un error al crear el usuario. Intente nuevamente. Si el error persiste, contacte al administrador del sistema.",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/LoginUser' }
  } */
  try {
    const userPayload = req.body;
    // find user email on USERS
    const user = USERS.find((user) => user.email === userPayload.email);
    if (
      !user ||
      !(await bcrypt.compare(userPayload.password, user.password))
    ) {
      res.status(401).send("Invalid credentials");
      return;
    }
    const token = jwt.sign(
      { userName: user.name, email: user.email },
      process.env.JWT_KEY,
      {
        expiresIn: "10m",
      }
    );
    console.log(user);
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/RecoverPassword' }
  } */
  try {
    const userPayload = req.body;
    // find user email on USERS
    const user = USERS.find((user) => user.email === userPayload.email);
    if (!user) {
      res.status(401).send("Datos no válidos");
      return;
    }
    const randomToken = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );

    sendRecoveryCodeEmail(user.email, randomToken);

    // save confirmation code in JSON CODES, if email exists refresh code else create
    const code = CODES.find((code) => code.email === user.email);
    if (code) {
      code.code = randomToken.toString();
    }
    else {
      CODES.push({
        code: randomToken.toString(),
        email: user.email,
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.confirmCode = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/RecoverPassword' }
  } */
  try {
    const userPayload = req.body;
    // find user email and code on CODES
    const user = CODES.find((code) => code.email === userPayload.email && code.code === userPayload.code);
    console.log(CODES);
    if (!user) {
      res.status(401).send("Datos no válidos");
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = async (req, res) => {
  // #swagger.tags = ['Users']
  /*  #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Add a user',
          schema: { $ref: '#/definitions/ResetPassword' }
  } */
  try {
    const userPayload = req.body;
    //find user email on USERS and update password
    const user = USERS.find((user) => user.email === userPayload.email);
    if (!user) {
      res.status(401).send("Datos no válidos");
      return;
    }
    user.password = await bcrypt.hash(userPayload.password, saltRounds);
    console.log("New  Users", USERS);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.getUser = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const user = USERS.find((user) => user.id === req.params.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
}

exports.addUserCustomRestaurant = async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const restaurantPayload = req.body;
    console.log(restaurantPayload);

    res.status(204).send();
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
}
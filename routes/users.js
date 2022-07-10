const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
  listUsers,
  confirmCode,
  addUserCustomRestaurant,
  getUser,
} = require("../controllers/users");
const { checkUserIsAuthenticated, checkRoles } = require("../middlewares/auth");
const { validateSchema } = require("../middlewares/validation");
const { ROLES } = require("../utils/constants");
const {
  createUserSchema,
  loginSchema,
  recoverPasswordSchema,
  resetPasswordSchema,
  confirmCodeSchema,
  restaurantCustomSchema,
} = require("../validators/users");

router
  .route("/")
  .get([checkUserIsAuthenticated, checkRoles([ROLES.ADMIN])], listUsers)
  .post([validateSchema(createUserSchema)], createUser);

router.route("/login").post([validateSchema(loginSchema)], loginUser);

router
  .route("/recover-password")
  .post([validateSchema(recoverPasswordSchema)], recoverPassword);

router
  .route("/confirm-code")
  .post([validateSchema(confirmCodeSchema)], confirmCode);


router
  .route("/reset-password")
  .patch([validateSchema(resetPasswordSchema)], resetPassword);

router
  .route("/custom-restaurant")
  .post([validateSchema(restaurantCustomSchema)], addUserCustomRestaurant);


module.exports = router;

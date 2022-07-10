const express = require("express");
const router = express.Router();

const {
    createRestaurant,
    getRestaurants,
    getRestaurant
} = require("../controllers/restaurant");
const { route } = require("./users");

router
    .route("/")
    .post(createRestaurant)
    .get(getRestaurants);

router
    .route("/get-restaurants")
    .get(getRestaurants);

// crete route for get restaurant by name, name is a parameter
router
    .route("/get-restaurant")
    .get(getRestaurant);

module.exports = router;
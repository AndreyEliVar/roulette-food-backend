const express = require("express");
const router = express.Router();

const {
    getRestaurants,
    getRestaurant
} = require("../controllers/restaurant");


router
    .route("/get-restaurants")
    .get(getRestaurants);

// crete route for get restaurant by name, name is a parameter
router
    .route("/get-restaurant")
    .get(getRestaurant);

module.exports = router;
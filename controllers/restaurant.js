const {RESTAURANTS} = require("../utils/restaurant");


exports.getRestaurants = async (req, res) => {
    // #swagger.tags = ['Restaurants']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get a restaurant',
            schema: { $ref: '#/definitions/CreateRestaurant' }
    } */
    try {
        const restaurantPayload = req.body;
        res.json(RESTAURANTS.restaurants);
    } catch (error) {
        res.status(500).send("Server error: " + error);
    }
}


exports.getRestaurant = async (req, res) => {
    // #swagger.tags = ['Restaurants']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get a restaurant',
            schema: { $ref: '#/definitions/CreateRestaurant' }
    } */
    try {
        // get name from params
        const restaurantName = req.query.name;
        const restaurant = RESTAURANTS.restaurants.find((restaurant) => restaurant.name === restaurantName);
        if (!restaurant || !restaurantName) {
            res.status(404).send("Restaurant not found");
            return;
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).send("Server error: " + error);
    }
}
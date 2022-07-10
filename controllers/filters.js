const {FILTERS} = require("../utils/filters");

exports.getFilters = async (req, res) => {
    // #swagger.tags = ['Restaurants']
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Get a restaurant',
            schema: { $ref: '#/definitions/CreateRestaurant' }
    } */
    try {
        const filterPayload = req.body;
        
    
        res.json(FILTERS);
    } catch (error) {
        res.status(500).send("Server error: " + error);
    }
}
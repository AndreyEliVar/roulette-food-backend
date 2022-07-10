const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',      // by default: '1.0.0'
    title: 'RouletteFood',        // by default: 'REST API'
    description: 'Choose your place to eat randomly',  // by default: ''
  },
  host: 'immense-sea-88595.herokuapp.com',      // by default: 'localhost:3000'
  schemes: ["http","https"],   // by default: ['http']
  definitions:{
      CreateUser: {
        name: "José Rodríguez Pérez",
        email: "example@email.com",
        password: "password",
        countryCode: 506,
        phone: 70155104,
        birthday: "1989-10-16",
      },
      LoginUser: {
        email: "example@email.com",
        password: "password",
      },
      RecoverPassword: {
        email: "example@email.com",
      },
      ResetPassword: {
        email: "example@email.com",
        password: "password",
        code: 123456,
      },
      CreateRestaurant: {
        name: "Restaurante los patitos",
        description: "El restaurante mas bueno",
        secondaryDescription: "You wont regret it",
        address: "2 miles to the north from the store",
        filters: ["filter","filter"],
      },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

   swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("./server.js");
  });
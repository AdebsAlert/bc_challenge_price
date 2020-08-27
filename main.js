'use strict'

require('dotenv').config();

const express = require('express');
const express_graphql = require('express-graphql');
const appPort = process.env.PORT;

// GraphQL Schema
const apiSchema = require('./schema');

// Api Service
const apiService = require('./service');

// Root Resolver
var root = {
  calculatePrice: apiService.getPrice
};

// Express Server and GraphQL Endpoint
var app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: apiSchema,
    rootValue: root,
    graphiql: true
  })
);

// Start Server
app.listen(appPort, () => {
  console.log(`Server Running - :${appPort}/graphql`);
});

module.exports = app;

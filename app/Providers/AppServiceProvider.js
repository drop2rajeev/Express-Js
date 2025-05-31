const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express application instance
const appService = express();

// Setup database connection using Knex
const knexConfig = require(path.join(global.__basedir, 'config/database'));
const knex = require('knex')(knexConfig.dbConnection);

// Make knex instance available throughout the app via app.locals
appService.locals.knex = knex;

// Register routes by requiring RouteServiceProvider and passing appService instance
require(path.join(global.__basedir, 'app/Providers/RouteServiceProvider'))(appService);

// Register view engine and related setup by passing appService instance
require(path.join(global.__basedir, 'app/Providers/ViewServiceProvider'))(appService);

// Middleware to parse incoming JSON requests
appService.use(express.json());

// Export the configured Express app instance
module.exports = appService;
require('dotenv').config(); // Load environment variables
const express = require('express');
const csrfMiddleware = require('../Middleware/CSRFProtection');
const session = require('express-session');
const csurf = require('csurf');

// Initialize Express application instance
const appService = express();

// Setup database connection using Knex
const knexConfig = require(path.join(__rootDir, 'config/database'));
const knex = require('knex')(knexConfig.dbConnection);

// Make knex instance available throughout the app
appService.locals.knex = knex;

// Register routes
require(path.join(__rootDir, 'app/Providers/RouteServiceProvider'))(appService);

// Register view engine and setup
require(path.join(__rootDir, 'app/Providers/ViewServiceProvider'))(appService);

// Middleware
appService.use(express.json()); // To parse JSON requests

makeAvailableCsrfToken(appService);
function makeAvailableCsrfToken(appService){
    // Session setup (required before CSRF)
    appService.use(session({
        secret: process.env.APP_KEY || '',
        resave: false,
        saveUninitialized: true
    }));

    appService.use(csurf()); // CSRF protection
    appService.use(csrfMiddleware); // Apply CSRF protection with exceptions
}

// Export the configured Express app instance
module.exports = appService;

const path = require('path');
const engine = require('ejs-mate');

/**
 * Configure the view engine and view-related settings
 * @param {import('express').Express} appService
 */
module.exports = function configureViews(appService) {
  // Use ejs-mate to support layouts, partials, and includes in EJS
  appService.engine('ejs', engine);
  appService.set('view engine', 'ejs');

  // Set the directory where view templates are located
  appService.set('views', path.join(global.__basedir, 'resources/views'));

  // Initialize a shared 'viewObject' object in app locals to hold global variables accessible in all views
  appService.locals.viewObject = {};
};
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

  // Set global template variables available in all views
  appService.locals.pageTitle = "";      // Default page title
  appService.locals.showSidebar = false; // Toggle sidebar visibility
};
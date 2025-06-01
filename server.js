const path = require('path');

const __basedir = path.resolve(__dirname);

// Set the Global __base directory
global.__basedir = __basedir;

// Require your configured Express app using global base path
const appService = require(path.join(__basedir, 'app/Providers/AppServiceProvider'));

// Get port from env or fallback to 3000
const AppPORT = process.env.APP_PORT || 3000;

// Start the server
appService.listen(AppPORT, () => {
  console.log(`Server running on http://localhost:${AppPORT}`);
});
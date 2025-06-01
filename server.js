// Load global rootPath and path
require('./rootDir');

// Require your configured Express app using global root path
const appService = require(path.join(__rootDir, 'app/Providers/AppServiceProvider'));

// Get port from env or fallback to 3000
const AppPORT = process.env.APP_PORT || 3000;

// Start the server
appService.listen(AppPORT, () => {
  console.log(`🚀 Server running at http://localhost:${AppPORT}`);
});
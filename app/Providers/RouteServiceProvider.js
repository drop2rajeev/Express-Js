module.exports = function registerRoutes(appService) {
  // Define base paths and corresponding route files (relative to project root)
  const routes = [
    { path: '/', files: ['routes/web'] },
    { path: '/api', files: ['routes/api'] }
  ];

  // Loop through each route group and mount it to the app
  routes.forEach(({ path: basePath, files }) => {
    files.forEach(file => {
      const fullPath = require('path').join(__rootDir, file);
      appService.use(basePath, require(fullPath));
    });
  });
};
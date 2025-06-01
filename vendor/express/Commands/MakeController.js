const fs = require('fs');

module.exports = function (controllerName) {
  const controllersRoot = path.join(__rootDir, 'app/Http/Controllers');
  const parts = controllerName.split('/');
  const fileName = parts.pop();
  const className = fileName.replace(/[^a-zA-Z0-9]/g, '');
  const properClassName = className.charAt(0).toUpperCase() + className.slice(1);

  const dirPath = path.join(controllersRoot, ...parts);
  const filePath = path.join(dirPath, `${properClassName}.js`);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Prevent overwriting existing controllers
  if (fs.existsSync(filePath)) {
    console.log(`❌ Controller "${controllerName}" already exists.`);
    return;
  }

  const content = `
    const Controller = require('${path.relative(dirPath, path.join(__rootDir, 'app/Core/Controller'))}');

    class ${properClassName} extends Controller {
      index(req, res) {
        res.send('Hello from ${properClassName} Controller!');
      }
    }

    module.exports = new ${properClassName}();
  `;

  fs.writeFileSync(filePath, content.trimStart());
  console.log(`✅ Controller created: ${filePath}`);
};

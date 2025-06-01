const fs = require('fs');
const dedent = require('dedent');

module.exports = function (name) {
  const controllerBasePath = path.join(__rootDir, 'app/Http/Controllers');
  const filePath = path.join(controllerBasePath, `${name}.js`);
  const dirPath = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.log(`❌ Controller "${name}" already exists.`);
    return;
  }

  // Get class name from filename
  const parts = name.split('/');
  const className = parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '');
  const controllerClassName = className.charAt(0).toUpperCase() + className.slice(1);

  // Calculate relative path from new controller to Controller.js
  let relativePathToBase = path.relative(dirPath, path.join(__rootDir, 'app/Http/Controllers/Controller')).replace(/\\/g, '/');
  if (!relativePathToBase.startsWith('.')) {
    relativePathToBase = './' + relativePathToBase;
  }

  // Template content
  const template = dedent(`
    const Controller = require('${relativePathToBase}');

    class ${controllerClassName} extends Controller {
      index(req, res) {
        return this.success(res, {}, '${controllerClassName} index loaded');
      }
    }

    module.exports = new ${controllerClassName}();
  `);

  fs.writeFileSync(filePath, template.trimStart());
  console.log(`✅ Controller "${name}" created at: ${filePath}`);
};

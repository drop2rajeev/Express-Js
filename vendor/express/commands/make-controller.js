const fs = require('fs');
const path = require('path');

module.exports = function(name) {
  const controllersBase = path.join(__dirname, '../../../app/Controllers');
  const filePath = path.join(controllersBase, `${name}.js`);
  const dir = path.dirname(filePath);

  // Create directories recursively if needed
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.log(`❌ Controller "${name}" already exists.`);
    return;
  }

  // Derive class name from last part of the path
  const parts = name.split('/');
  const className = parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '');
  const controllerClassName = className.charAt(0).toUpperCase() + className.slice(1) + 'Controller';

  const template = `
    // ${controllerClassName}

    class ${controllerClassName} {
      index(req, res) {
        res.send('Hello from ${controllerClassName} index!');
      }
    }
    module.exports = new ${controllerClassName}();
`;

  fs.writeFileSync(filePath, template.trim());
  console.log(`✅ Controller "${name}" created at ${filePath}`);
};

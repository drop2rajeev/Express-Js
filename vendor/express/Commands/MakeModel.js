const fs = require('fs');
const path = require('path');
const dedent = require('dedent');

module.exports = function (name) {
  const modelBasePath = path.join(__rootDir, 'app/Models');
  const filePath = path.join(modelBasePath, `${name}.js`);
  const dirPath = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.log(`❌ Model "${name}" already exists.`);
    return;
  }

  // Get class name from filename
  const parts = name.split('/');
  const className = parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '');
  const modelClassName = className.charAt(0).toUpperCase() + className.slice(1);

  // Calculate relative path to base Eloquent Model
  const relativePathToBase = path.relative(dirPath, path.join(__rootDir, 'vendor/express/Eloquent/Model'));

  // Template content
  const template = dedent(`
    const Model = require('${relativePathToBase.replace(/\\/g, '/')}');

    class ${modelClassName} extends Model {
      constructor() {
        super();
        // Define your model fields here
      }

      // Add model-specific methods if needed
    }

    module.exports = new ${modelClassName};
  `);

  fs.writeFileSync(filePath, template.trimStart());
  console.log(`✅ Model "${name}" created at: ${filePath}`);
};

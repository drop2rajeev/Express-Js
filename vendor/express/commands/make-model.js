const fs = require('fs');
const path = require('path');

module.exports = function(name) {
  const modelsBase = path.join(__basedir, 'app/Models');
  const filePath = path.join(modelsBase, `${name}.js`);
  const dir = path.dirname(filePath);

  // Create directories recursively if not exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.log(`❌ Model "${name}" already exists.`);
    return;
  }

  // Extract class name from last segment, capitalize it
  const parts = name.split('/');
  const className = parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '');
  const modelClassName = className.charAt(0).toUpperCase() + className.slice(1);

  // Basic model template (adjust for your ORM or structure)
  const template = `
// ${modelClassName} Model

class ${modelClassName} {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  // Example: save method stub
  save() {
    // TODO: Implement save logic
    console.log('Saving ${modelClassName}...');
  }

  // Example: static find method stub
  static find(id) {
    // TODO: Implement find logic
    console.log('Finding ${modelClassName} with ID:', id);
  }
}

module.exports = ${modelClassName};
`;

  fs.writeFileSync(filePath, template.trim());
  console.log(`✅ Model "${name}" created at ${filePath}`);
};

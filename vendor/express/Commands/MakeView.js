const fs = require('fs');

module.exports = function(name) {
  const viewsBase = path.join(__rootDir, 'resources/views');
  const filePath = path.join(viewsBase, `${name}.ejs`);
  const dir = path.dirname(filePath);

  // Create directory recursively if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    console.log(`❌ View "${name}" already exists.`);
    return;
  }

  fs.writeFileSync(filePath, `<h1>${name} view</h1>\n`);
  console.log(`✅ View "${name}" created at ${filePath}`);
};
const fs = require('fs');
const path = require('path');
const dedent = require('dedent');
const pluralize = require('pluralize');

module.exports = function (name) {
  const migrationsDir = path.join(__rootDir, 'database/migrations');

  if (!name) {
    console.log('❌ Migration name is required.');
    return;
  }

  // Ensure migrations directory exists
  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
  const tableName = pluralize(name.toLowerCase());
  const fileName = `${timestamp}_${tableName}.js`;
  const filePath = path.join(migrationsDir, fileName);

  // Check if migration already exists for the table
  const existing = fs.readdirSync(migrationsDir).find(f => f.includes(`_${tableName}.js`));
  if (existing) {
    console.log(`❌ Migration for table "${tableName}" already exists: ${existing}`);
    return;
  }

  // Generate a valid class name (PascalCase + Migration suffix)
  const className = name
    .split(/[^a-zA-Z0-9]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('') + 'Migration';

  const template = dedent(`
    class ${className} {
      async up(knex) {
        return knex.schema.createTable('${tableName}', (table) => {
          table.increments('id').primary();
          // Other Colums
          table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
          table.specificType('updated_at', 'TIMESTAMP').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')).notNullable();
        });
      }

      async down(knex) {
        return knex.schema.dropTable('${tableName}');
      }
    }

    module.exports = new ${className}();
  `);

  fs.writeFileSync(filePath, template.trimStart());
  console.log(`✅ Migration created: ${fileName}`);
};

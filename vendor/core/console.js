// Load global rootPath and path
require('./rootDir');

const { program } = require('commander');
const { execSync } = require('child_process');

// ---- Custom Commands ----
program.command('make:view [nameParts...]').description('Generate a view file').action((nameParts) => {
  if (!nameParts || nameParts.length === 0) {
    console.error('❌ Please specify a view name');
    process.exit(1);
  }
  const fullName = nameParts.join('/');
  require('./commands/make-view')(fullName);
});

program.command('make:controller [nameParts...]').description('Generate a controller file').action((nameParts) => {
  if (!nameParts || nameParts.length === 0) {
    console.error('❌ Please specify a controller name');
    process.exit(1);
  }
  const fullName = nameParts.join('/');
  require('./commands/make-controller')(fullName);
});

program.command('make:model [nameParts...]').description('Generate a model file').action((nameParts) => {
  if (!nameParts || nameParts.length === 0) {
    console.error('❌ Please specify a model name');
    process.exit(1);
  }
  const fullName = nameParts.join('/');
  require('./commands/make-model')(fullName);
});

// ---- Knex Migration Commands ----
const runKnex = (cmd) => {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error('Error:', e.message);
  }
};

const knexFile = path.join(__rootDir, 'vendor/express/database/knexfile.js');
program.command('make:migration <name>').description('Create a new migration file').action((name) => {
  const cmd = `npx knex migrate:make ${name} --knexfile ${knexFile} --env development`;
  runKnex(cmd)
});

program.command('migrate').description('Run all migrations').action(() => {
  const cmd = `npx knex migrate:latest --knexfile ${knexFile} --env development`;
  runKnex(cmd)
});

program.command('rollback').description('Rollback last migration').action(() => {
  const cmd = `npx knex migrate:rollback --knexfile ${knexFile} --env development`;
  runKnex(cmd)
});

program.parse(process.argv);

require('../../../rootDir'); // Load global __rootDir

const { program } = require('commander');
const { execSync } = require('child_process');
require('dotenv').config(); // Load Env Varibales

const knexFile = path.join(__rootDir, 'vendor/express/database/knexfile.js');

const commandConfigs = [
  {
    name: 'make:controller',
    args: '[nameParts...]',
    description: 'Generate a controller',
    handler: require(path.join(__rootDir, 'vendor/express/Commands/MakeController')),
    validate: (args) => args?.length,
    transform: (args) => args.join('/')
  },
  {
    name: 'make:model',
    args: '[nameParts...]',
    description: 'Generate a model',
    handler: require(path.join(__rootDir, 'vendor/express/Commands/MakeModel')),
    validate: (args) => args?.length,
    transform: (args) => args.join('/')
  },
  {
    name: 'make:view',
    args: '[nameParts...]',
    description: 'Generate a view',
    handler: require(path.join(__rootDir, 'vendor/express/Commands/MakeView')),
    validate: (args) => args?.length,
    transform: (args) => args.join('/')
  },
  {
    name: 'key:generate',
    args: '',
    description: 'Generate and update APP_KEY in .env',
    handler: require(path.join(__rootDir, 'vendor/express/Commands/KeyGenerate')),
    validate: () => true,    // no arguments, always valid
    transform: (args) => ''  // no transformation needed
  },
  {
    name: 'make:migration',
    args: '<name>',
    description: 'Create a new migration file',
    handler: require(path.join(__rootDir, 'vendor/express/Commands/MakeMigration')),
    validate: (arg) => !!arg,
    transform: (arg) => arg
  },
  {
    name: 'migrate',
    args: '',
    description: 'Run all migrations',
    handler: () => runKnex(`npx knex migrate:latest --knexfile ${knexFile} --env development`)
  },
  {
    name: 'migrate:rollback',
    args: '',
    description: 'Rollback last migration',
    handler: () => runKnex(`npx knex migrate:rollback --knexfile ${knexFile} --env development`)
  },
  {
    name: 'serve',
    args: '',
    description: 'To Start the Project',
    handler: () => require('../../../server.js')
  }
];

const runKnex = (cmd) => {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error('Error:', e.message);
  }
};

// Auto-register all commands
commandConfigs.forEach(({ name, args = '', description, handler, validate, transform }) => {
  program.command(`${name} ${args}`.trim()).description(description).action((...rawArgs) => {
    const input = rawArgs[0];

    if (validate && !validate(input)) {
      console.error(`❌ ${name} requires input`);
      return;
    }

    handler(transform ? transform(input) : input);
  });
});

program.parse(process.argv);
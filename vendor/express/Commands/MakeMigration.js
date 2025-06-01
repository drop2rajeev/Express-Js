const fs = require('fs');
const dedent = require('dedent');
const pluralize = require('pluralize');

module.exports = function (name) {
    const migrationsBasePath = path.join(__rootDir, 'database/migrations');

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const fileName = `${timestamp}_${name}.js`;
    const filePath = path.join(migrationsBasePath, fileName);

    if (!fs.existsSync(migrationsBasePath)) {
        fs.mkdirSync(migrationsBasePath, { recursive: true });
    }

    // Convert snake_case migration name to CamelCase class name
    const className = name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

    let baseName = name;
    if (name.startsWith('create_') && name.endsWith('_table')) {
        baseName = name.replace(/^create_/, '').replace(/_table$/, '');
    }
    // Get plural table name
    const tableName = pluralize(baseName);

    const template = dedent(`
        module.exports = {
            async up(queryInterface, Sequelize) {
                await queryInterface.createTable('${tableName}', {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false,
                    },
                    createdAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        allowNull: false,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                    }
                });

                // Add ON UPDATE CURRENT_TIMESTAMP to updatedAt column
                await queryInterface.sequelize.query(
                    'ALTER TABLE \`${tableName}\` MODIFY \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;'
                );
            },

            async down(queryInterface, Sequelize) {
                await queryInterface.dropTable('${tableName}');
            }
        };
    `);

    fs.writeFileSync(filePath, template.trimStart());
    console.log(`✅ Migration "${name}" created at: ${filePath}`);
};

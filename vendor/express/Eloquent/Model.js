class Model {
    constructor(tableName) {
        this.table = tableName;
        this.db = require(path.join(__rootDir, 'config/database')).dbConnection;
    }

    all() {
        return this.db(this.table).select();
    }

    find(id) {
        return this.db(this.table).where({ id }).first();
    }

    where(condition) {
        return this.db(this.table).where(condition);
    }

    // Add more query helpers if needed (insert, update, delete etc.)
}

module.exports = Model;

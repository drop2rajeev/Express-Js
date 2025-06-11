# Express App (Laravel-like Structure)

A Node.js project using **Express**, **Knex**, and **EJS** with Laravel-inspired structure.

---

## 1. Project Setup

- Clone the repository (if applicable)
- Navigate into the project folder:
    cd express-apps

- Install dependencies:
    npm install
---

## 2. Environment Setup

- Create the `.env` file:

    touch .env
    cp .env.example .env

- Open `.env` and configure your database and app settings:
    
    # Application settings
    APP_URL=127.0.0.1

    # Select your database driver: mysql | pgsql | sqlite
    DB_CONNECTION=mysql

    # MySQL config
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=root
    DB_PASSWORD=

    # PostgreSQL config
    PGSQL_HOST=127.0.0.1
    PGSQL_PORT=5432
    PGSQL_DATABASE=your_pg_database
    PGSQL_USERNAME=postgres
    PGSQL_PASSWORD=secret

    # SQLite config
    SQLITE_FILENAME=./database.sqlite
---

## 3. Database Migrations (Using Knex.js)

- Create a new migration file:
    node artisan make:migration tableName

- Run all pending migrations:
    node artisan migrate

- Rollback the last batch of migrations:
    node artisan migrate:rollback
---

## 4. Start the Project

- Run the server with:
    npm start

- Open your browser and visit:

    http://127.0.0.1:3000

---

## 5. Requirements

- Node.js (v14 or higher recommended)
- MySQL / PostgreSQL / SQLite installed (depending on your DB choice)
- npm (comes with Node.js)
- Environment variables properly configured in `.env`

---

## 6. Folder Structure (Summary)

    express-apps/
    ├── app/                    # Controllers and business logic
    │   └── Http/
    │       └── Controllers/    # Controller files
    ├── config/
    │   └── database.js         # DB connection configs
    ├── database/
    │   └── migrations/         # Migration files
    ├── public/                 # Static files (css, js, images)
    ├── resources/
    │   └── views/              # EJS (or other) template files
    ├── routes/
    │   ├── web.js              # Web routes
    │   └── api.js              # API routes
    ├── vendor/
    │   └── express/            # Custom framework/vendor files, e.g., database, eloquent, etc.
    ├── .env                    # Environment variables
    ├── server.js               # Server entry point
    ├── package.json            # NPM scripts and dependencies
    └── README.md               # Project documentation


---

## 7. Helpful Scripts (package.json)

| Command                                            | Description                        |
|----------------------------------------------------|------------------------------------|
| `node artisan serve`                               | Start Express server               |
| `node artisan make:migration tableName`            | Create new migration file          |
| `node artisan migrate`                             | Run migrations                     |
| `node artisan migrate:rollback`                    | Rollback last migration batch      |
| `node artisan make:controller controllerName`      | Rollback last migration batch      |
| `node artisan make:model modelName`                | Rollback last migration batch      |
| `node artisan make:view viewName`                  | Rollback last migration batch      |
| `node artisan key:generate`                        | Generate a new Application key     |

---

If you follow these steps carefully, your project should be up and running smoothly.

---
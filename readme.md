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
    APP_PORT=3000

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

    npm run make:migration -- create_users_table

- Run all pending migrations:

    npm run migrate

- Rollback the last batch of migrations:

    npm run rollback
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
    ├── config/
    │   ├── database.js         # DB connection configs
    │   └── knexfile.js         # Knex CLI config
    ├── database/
    │   └── migrations/         # Migration files
    ├── public/                 # Static files
    ├── resources/
    │   └── views/              # EJS templates
    ├── routes/
    │   ├── web.js              # Web routes
    │   ├── api.js              # API routes
    ├── .env                    # Environment config
    ├── app.js                  # Express app setup
    ├── server.js               # Server entry point
    ├── package.json            # NPM scripts & dependencies
    └── README.md               # This file

---

## 7. Helpful Scripts (package.json)

| Command                   | Description                          |
|---------------------------|------------------------------------|
| `npm start`               | Start Express server                |
| `npm run make:migration`  | Create new migration file           |
| `npm run migrate`         | Run migrations                      |
| `npm run rollback`        | Rollback last migration batch      |

---

If you follow these steps carefully, your project should be up and running smoothly.

---
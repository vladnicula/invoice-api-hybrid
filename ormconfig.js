module.exports = {
    "type": "sqlite",
    "database": "invoice-app-db",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "migrations": [
        "dist/migrations/*.js"
    ],
    "cli": {
        "migrationsDir":  "src/migrations"
    }
}
module.exports = {
    "type": "sqlite",
    "database": "invoice-app-db",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "migrations": [
        "dist/migration/*.js"
    ],
    "cli": {
        "migrationsDir":  "src/migration"
    }
}
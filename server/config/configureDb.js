import fs from 'fs';
import sqlite3 from 'sqlite3';

import config from '../../config';

const configureDb = function () {
    const exists = fs.existsSync(config.db);
    if (!exists) {
        console.log("Creating DB file.");
        fs.openSync(config.db, "w");
    }

    let db = sqlite3.verbose();
    db = new db.Database(config.db);

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "email" CHAR(80) NOT NULL,
                "displayName" CHAR(50) NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "user_fingerprints" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "userId" INTEGER
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "beers" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar(128),
                "labelUrl" varchar(256),
                "vol" float(128) DEFAULT(0)
            );
        `);
    });

    return db;
};

export default configureDb;

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
                "displayName" CHAR(50) NOT NULL,
                "profilePhoto" CHAR(255),
                "slackName" char(50),
                "active" integer(1) DEFAULT(1),
                "role" char(32) DEFAULT 'user',
                "password" char(255),
                "userToken" char(255)
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "userFingerprints" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "userId" INTEGER,
                "status" char(32) DEFAULT 'pending'
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "userBeers" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "userId" integer(128),
                "beerKegId" integer(128),
                "volume" integer(128),
                "date" varchar(64)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "beerBrands" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar(128),
                "vol" float(128) DEFAULT(0),
                "label" varchar(256),
                "active" integer(1) DEFAULT(1)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "beerKegs" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "beerBrandId" integer NOT NULL,
                "volume" integer,
                "volumePoured" integer,
                "price" float,
                "purchaseDate" varchar(64),
                "active" integer(1) DEFAULT(1)
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS "beerTaps" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "beerKegId" integer NOT NULL,
                "position" integer(128),
                "active" integer(1) DEFAULT(1)
            );
        `);
    });

    return db;
};

export default configureDb;

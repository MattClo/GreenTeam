import sqlite3 from "sqlite3";
import { open } from 'sqlite';

const DB_NAME = "people.db"

function createTables() {
    const db = createDBConnection
    const tables_sql = `
    CREATE TABLE admin (
        username TEXT,
        password TEXT,
    );

    CREATE TABLE users (
        username TEXT,
        password TEXT,
        fname TEXT,
        lname TEXT,
        location TEXT,
        role TEXT,
        biography TEXT,
    );

    CREATE TABLE tags (
        username TEXT,
        interest TEXT,
        FOREIGN KEY (username)
        REFERENCES users (username);

    )
    `;
}

function createDBConnection() {
    return new sqlite3.Database(DB_NAME)
}

const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const DB_NAME = "people.db"

function createTables() {
    const db = createDBConnection()
    console.log("created db")
    const tables_sql = `
    CREATE TABLE admin (
        username TEXT,
        password TEXT 
    );
`/*
    CREATE TABLE users (
        username TEXT,
        password TEXT,
        fname TEXT,
        lname TEXT,
        location TEXT,
        role TEXT,
        biography TEXT
    );

    CREATE TABLE tags (
        username TEXT,
        interest TEXT,
        FOREIGN KEY (username)
        REFERENCES users (username);
    );
    `;//*/

    db.run(tables_sql)
    db.close()
    console.log("created tables")
}

function queryAllUsers() {
    const db = createDBConnection()
    const sql = "SELECT * FROM users"
    const usrs = new Array()
    console.log("begin query")
    db.all(sql, null, (err, rows) => {
        rows.forEach((row) => {
            const x = {
                id: row.id,
                username: row.username,
                password: row.password,
                fname: row.fname
            };
            usrs.push(row);
        })
    })

    return usrs
}

function dropDB() {
    const fs = require("fs")
    console.log("Removing db")
    fs.rm(DB_NAME)
    console.log("DB Removed")
}

function createDBConnection() {
    return new sqlite3.Database(DB_NAME, {verbose: true})
}


dropDB()
createTables()
console.log("begin print")
//console.log(queryAllUsers())
console.log("end print")


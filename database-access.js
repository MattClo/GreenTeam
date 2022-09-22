const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");
const { isFloat32Array } = require("util/types");

const IN_MEM = ":memory:"
const DB_NAME = "people.db"

function dropDB() {
    const fs = require("fs")
    fs.unlinkSync(DB_NAME)
}

function createTables() {
    const tables_sql = [
    "CREATE TABLE users(username TEXT, password TEXT, fname TEXT, lname TEXT, location TEXT, role TEXT, biography TEXT);",
    "CREATE TABLE admin(username TEXT, password TEXT);",
    "CREATE TABLE tags(username TEXT, interest TEXT);"
    ];

    const db = createDBConnection()

    db.serialize(function () {
        for(s of tables_sql) {
            db.run(s)
        }
    })

    console.log("created tables")
    db.close()
}

function printTables() {
    db.serialize(function () {
        db.each("select name from sqlite_master where type='table'", function (err, table) {
            console.log(table);
        });
    });
}

function queryAllUsers() {
    const q = "SELECT * FROM users"
    getSQL(q, [])
}

class Admin {
    constructor(uname, pwd) {
        this.uname = uname
        this.pwd = pwd
    }
}

class User {
    constructor(uname, pwd, fname, lname,
        location, role, bio) {
            this.uname = uname
            this.pwd = pwd
            this.fname = fname
            this.lname = lname
            this.location = location
            this.role = role
            this.bio = bio
    }

    fullname() {
        return this.fname + " " + this.lname
    }
}

function addMin(admin) {
    throw "not implemented"
}

function addUser(user) {
    const q = "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?)"
    const x = runSQL(q, [user.uname, user.pwd, user.fname, user.lname, 
        user.location, user.role, user.bio])
    return x
}

function runSQL(sql, params) {
    const db = createDBConnection()
    db.run(sql, params)
    db.close()
}

function getSQL(sql, params) {
    const db = createDBConnection()
    let x;
    
    db.all(sql, params, (err, rows) => {
        if(err) {
            console.log(err)
            x = null;
        } else {
            x = rows;
        }
    })
    db.close()
    // because the query must conclude before close, this acts as a mutex
    return x
}

function createDBConnection() {
    return new sqlite3.Database(DB_NAME)
}

test_user = new User("john", "small", "John", "Smith", "London", "Dev", "I have worked for a while")

//dropDB()
//createTables()
//printTables()
addUser(test_user)
console.log(queryAllUsers())


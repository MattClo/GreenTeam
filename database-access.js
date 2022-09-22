const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");


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

const IN_MEM = ":memory:"
const DB_NAME = "people.db"
const db = new sqlite3.Database(DB_NAME)

const tables_sql = [
    "CREATE TABLE users(username TEXT, password TEXT, fname TEXT, lname TEXT, location TEXT, role TEXT, biography TEXT);",
    "CREATE TABLE admin(username TEXT, password TEXT);",
    "CREATE TABLE tags(username TEXT, interest TEXT);"
];

for(s of tables_sql) {
    db.run(s)
}

db.close()

user = new User("john", "small", "John", "Smith", "London", "Dev", "I have worked for a while")

const db1 = new sqlite3.Database(DB_NAME)
const q = "INSERT INTO users(?, ?, ?, ?, ?, ?, ?)"
const query = db.prepare(q)
query.run(user.uname, user.pwd, user.fname, user.lname, 
    user.location, user.role, user.bio)
query.finalize()

/*function dropDB() {
    const fs = require("fs")
    fs.unlinkSync(DB_NAME)
}

function createTables() {
    const tables_sql = [
    "CREATE TABLE users(username TEXT, password TEXT, fname TEXT, lname TEXT, location TEXT, role TEXT, biography TEXT);",
    "CREATE TABLE admin(username TEXT, password TEXT);",
    "CREATE TABLE tags(username TEXT, interest TEXT);"
    ];

    db.serialize(function () {
        for(s of tables_sql) {
            db.run(s)
        }
    })
    //db.close()

    console.log("created tables")
}

function printTables() {
    db.serialize(function () {
        db.each("select name from sqlite_master where type='table'", function (err, table) {
            console.log(table);
        });
    });
}

function queryAllUsers() {
    throw "not implemented"
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
    const q = "INSERT INTO users(?, ?, ?, ?, ?, ?, ?)"
    const query = db.prepare(q)
    query.run(user.uname, user.pwd, user.fname, user.lname, 
        user.location, user.role, user.bio)
    query.finalize()
}

test_user = new User("john", "small", "John", "Smith", "London", "Dev", "I have worked for a while")

//dropDB()
createTables()
//printTables()
addUser(test_user)
//console.log(queryAllUsers())
*/

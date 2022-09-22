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
    "CREATE TABLE users(username TEXT, password TEXT, fname TEXT, lname TEXT, location TEXT, role TEXT, biography TEXT, imagepath TEXT);",
    "CREATE TABLE admin(username TEXT, password TEXT);",
    "CREATE TABLE tags(uid INT, interest TEXT);"
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
    const rows = getSQL(q, [])

}

class Admin {
    constructor(uname, pwd) {
        this.uname = uname
        this.pwd = pwd
    }
}

class User {
    uid

    constructor(uname, pwd, fname, lname,
        location, role, bio, imagepath, age, interests) {
            this.username = uname
            this.pwd = pwd
            this.forename = fname
            this.surname = lname
            this.location = location
            this.role = role
            this.bio = bio
            this.imagepath = imagepath
            this.age = age
            this.interests = interests
            // needs age, interests
    }

    fullname() {
        return this.fname + " " + this.lname
    }
}

function addAdmin(admin) {
    throw "not implemented"
}

function addUser(user) {
    // 3 stages
    // 1. add the user
    // 2. find the pk (int id by default in sqlite)
    // 3. add all interests

    // stage 1
    const q1 = "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
    runSQL(q1, [user.uname, user.pwd, user.fname, user.lname, 
        user.location, user.role, user.bio, user.imagepath, user.age])

    // stage 2
    const q2 = "SELECT id FROM users WHERE users.username = ?"
    uid = getSQL(q2, [user.username])


    // stage 3
    const xs = user.interests
    
    for(x of xs) {
        const interest_query = "INSERT INTO tags VALUES(?, ?)"
        runSQL(interest_query, [x])
    }
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


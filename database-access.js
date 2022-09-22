const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const IN_MEM = ":memory:"
const DB_NAME = "people.db"

function dropDB() {
    const fs = require("fs")
    fs.unlinkSync(DB_NAME)
}

function createTables() {
    const tables_sql = [
        "CREATE TABLE users(username TEXT, password TEXT, fname TEXT, lname TEXT, location TEXT, role TEXT, biography TEXT, imagepath TEXT, age NUMBER);",
        "CREATE TABLE admin(username TEXT, password TEXT);",
        "CREATE TABLE tags(username INT, interest TEXT);"
    ];

    const db = createDBConnection()

    db.serialize(function () {
        for(s of tables_sql) {
            db.exec(s)
        }
    })

    db.close()
}

function printTables() {
    const db = createDBConnection()
    db.serialize(function () {
        db.each("select name from sqlite_master where type='table'", function (err, table) {
            console.log(table);
        });
    });
}

function queryAllUsers() {
    const q = "SELECT * FROM users;"
    const rows = getSQL(q, [])

    return rows
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
    // 2. find the pk (username at the moment)
    // 3. add all interests

    // stage 1
    const q1 = "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
    runSQL(q1, [user.uname, user.pwd, user.fname, user.lname, 
        user.location, user.role, user.bio, user.imagepath, user.age])

    // stage 2
    /*const q2 = "SELECT id FROM users WHERE users.username = ?"
    uid = getSQL(q2, [user.username])*/ // if int uid given, this retrieves that ID

    // stage 3
    const xs = user.interests
    
    if(null !== xs) {
        for(x of xs) {
            const interest_query = "INSERT INTO tags VALUES(?, ?)"
            runSQL(interest_query, [user.uname, x])
        }
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
            console.log("Success")
            x = rows;
        }
    })
    db.close()
    console.log(x)
    // because the query must conclude before close, this acts as a mutex
    return x
}

function createDBConnection() {
    return new sqlite3.Database(DB_NAME)
}

test_user = new User("john", "small", "John", "Smith", "London", "Dev", "I have worked for a while", "", 20, [])


//dropDB()
//createTables()
//printTables()
addUser(test_user)
console.log(queryAllUsers())

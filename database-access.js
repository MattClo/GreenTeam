const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const DB_NAME = "people.db"
const db = createDBConnection()

function createTables() {
    const tables_sql = [
    "CREATE TABLE users(username TEXT, password TEXT, fname TEXT, lname TEXT, location TEXT, role TEXT, biography TEXT)",
    "CREATE TABLE admin(username TEXT, password TEXT)",
    "CREATE TABLE tags(username TEXT, interest TEXT)"
    ];

    db.open()
    for(s of tables_sql) {
        db.exec(s)
    }
    db.close()

    console.log("created tables")
}

function queryAllUsers() {
    const db = createDBConnection()
    const sql = "SELECT * FROM users"
    const usrs = new Array()
    console.log("begin query")
        db.all(sql, null, (err, rows) => {
            if(undefined !== rows) {
            rows.forEach((row) => {
                x = new User(row.username, row.password,
                    row.fname, row.lname, row.location,
                    row.role, row.biography)
                usrs.push(row);
            })
        }
    })

    return usrs
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
    const sql = `
    INSERT INTO admin
    VALUES (${admin.uname}, ${admin.pwd})
    `
    execDB(sql)
}

function addUser(user) {
    const sql = `
    INSERT INTO users
    VALUES (${user.uname}, ${user.pwd}, ${user.fname}, ${user.lname},
        ${user.location}, ${user.role}, ${user.biography})
    `
    execDB(sql)
}

function execDB(sql) {
    const db = createDBConnection()
    db.serialize(function () {
        db.run(sql)
    })
    db.close()
}

function dropDB() {
    const fs = require("fs")
    console.log("Removing db")
    const path = "./"+DB_NAME
    if(fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
    console.log("DB Removed")
}

function createDBConnection() {
    return new sqlite3.Database(DB_NAME, {verbose: true})
}

function printTables() {
    const db = createDBConnection()
    db.serialize(function () {
        db.all("select name from sqlite_master where type='table'", function (err, tables) {
            console.log(tables);
        });
    });
}

test_user = new User("john", "small", "John", "Smith", "London", "Dev", "I have worked for a while")

dropDB()
createTables()
//printTables()
//addUser(test_user)
//console.log(queryAllUsers())


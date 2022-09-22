
    //Initialise SQL and DB
    const sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('people.db');

    //Create User class
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

    //Create users
    user1 = new User("john", "small", "John", "Smith", "London", "Dev", "I have worked for a while", "test", "20", ["Boxing","Football","Potatoes"])
    user2 = new User("mara", "small", "Mara", "Ivascau", "London", "Product Manager", "I have worked for a while", "test", "20", ["Losing at table tennis","Carrots","Potatoes"])
    user3 = new User("mike", "small", "Michael", "Hallam", "London", "Data Scientist", "I have worked for a while", "test", "20", ["Boxing","Football","Potatoes"])
    user4 = new User("bob", "small", "Bob", "Roberts", "London", "Dev", "I have worked for a while", "test", "20", ["Losing at table tennis","Carrots","Potatoes"])
    
    //Create tables and users
    createTables();
    addUser(user1);
    addUser(user2);
    addUser(user3);
    addUser(user4);





    function createTables() {
        const tables_sql = [
            `CREATE TABLE users (username TEXT, password TEXT, forename TEXT, surname TEXT, location TEXT, role TEXT, biography TEXT, imagepath TEXT, age TEXT);`,
            `CREATE TABLE admin (username TEXT, password TEXT);`,
            `CREATE TABLE tags (username INT, interest TEXT);`
        ];

        db.serialize(()=>{
            tables_sql.forEach(query=>{
               db.run(query,[],err=>{if(err){console.log("ffs:"+err)}else{console.log("made table")}});
            })
        });
    }



    function addUser(user) {

        // stage 1 - add user
        db.run(`insert into users (username,password,forename,surname,location,role,biography,imagepath,age) values (?,?,?,?,?,?,?,?,?)`, [user.username,user.pwd,user.forename,user.surname,user.location,user.role,user.bio,user.imagepath, user.age],err=>{if(err){console.log("ffs:"+err)}else{console.log("made user")}});
        
        // stage 2 - add interests
        user.interests.forEach(interest=>{
            console.log(interest);
            db.run(`INSERT INTO tags (username,interest) values (?,?);`,[user.username,interest],err=>{if(err){console.log("ffs:"+err)}else{console.log("added interest")}});
        })
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

    function addAdmin(admin) {
        throw "not implemented"
    }

    
    class Admin {
        constructor(uname, pwd) {
            this.uname = uname
            this.pwd = pwd
        }
    }



    function dropDB() {
        fs.unlinkSync(DB_NAME)
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















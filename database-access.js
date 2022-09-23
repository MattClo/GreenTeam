
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
    user1 = new User("owan1", "small", "Owan", "Alenkhe", "London", "UX Designer", "New employee at Cirium looking forward to meeting new people!", "test", "22", ["Art","Music","Football"])
    user2 = new User("georgia1", "small", "Georgia", "Bresnick", "London", "UX Designer", "New employee at EG looking forward to meeting new people!", "test", "21", ["Art","Music","Tennis"])
    user3 = new User("matt1", "small", "Matt", "Clough", "Nottingham", "Placement Systems Engineer", "New employee at LNRS looking forward to meeting new people!", "test", "20", ["Boxing","Music","Football"])
    user4 = new User("matt2", "small", "Matt", "Burke", "Leeds", "Software Engineer", "New employee at RSG looking forward to meeting new people!", "test", "20", ["Bouldering","Gym","Food"])
    user5 = new User("ben1", "small", "Ben", "Chatfield", "Sutton", "Business Management", "New employee at RSG looking forward to meeting new people!", "test", "22", ["Football","Music","Food"])
    user6 = new User("tade1", "small", "Tade", "Falade", "London", "Product Manager", "New employee at RSG looking forward to meeting new people!", "test", "23", ["Football","Music","Art"])
    user7 = new User("lavinia1", "small", "Lavinia", "Foschini", "London", "UX Designer", "New employee at Cirium looking forward to meeting new people!", "test", "23", ["Art","Music","Bouldering"])
    user8 = new User("michael1", "small", "Michael", "Hallam", "London", "Data Scientist", "New employee at EG looking forward to meeting new people!", "test", "21", ["Games","Music","Food"])
    user9 = new User("johannes1", "small", "Johannes", "Heidecke", "London", "Data Scientist", "New employee at EG looking forward to meeting new people!", "test", "23", ["Boxing","Music","Football"])
    user10 = new User("ash1", "small", "Ashley", "Hunt", "Nottingham", "Placement Software Engineer", "New employee at LNRS looking forward to meeting new people!", "test", "22", ["Bouldering","Music","Tennis"])
    user11 = new User("adam1", "small", "Adam", "Iqbal", "Nottingham", "Placement Software Engineer", "New employee at LNRS looking forward to meeting new people!", "test", "20", ["Boxing","Music","Football"])
    user12 = new User("mara1", "small", "Mara", "Ivascau", "London", "Product Manager", "New employee at Cirium looking forward to meeting new people!", "test", "20", ["Tennis","Gym","Art"])
    user13 = new User("matt3", "small", "Matt", "Jones", "Cardiff", "Placement Software Engineer", "New employee at RSG looking forward to meeting new people!", "test", "22", ["Football","Music","Food"])
    user14 = new User("olivia1", "small", "Olivia", "Marr", "London", "Data Scientist", "New employee at Cirium looking forward to meeting new people!", "test", "21", ["Bouldering","Bowling","Art"])
    user15 = new User("annarose1", "small", "Annarose", "McGill", "London", "UX Designer", "New employee at ICIS looking forward to meeting new people!", "test", "21", ["Art","Bowling","Gym"])
    user16 = new User("tim1", "small", "Tim", "Moelich", "London", "Product Manager", "New employee at EG looking forward to meeting new people!", "test", "22", ["Games","Tennis","Food"])
    user17 = new User("jasmin1", "small", "Jasmin", "Monteiro", "Sutton", "Data Analyst", "New employee at ICIS looking forward to meeting new people!", "test", "22", ["Art","Music","Football"])
    user18 = new User("diya1", "small", "Diya", "Mukherjee", "Cardiff", "Placement Software Engineer", "New employee at LNRS looking forward to meeting new people!", "test", "20", ["Art","Music","Tennis"])
    user19 = new User("ali1", "small", "Ali", "Najafi", "Sutton", "Software Engineer", "New employee at RSG looking forward to meeting new people!", "test", "20", ["Bowling","Art","Food"])
    user20 = new User("liam1", "small", "Liam", "Neate", "Nottingham", "Placement Software Engineer", "New employee at LNRS looking forward to meeting new people!", "test", "20", ["Bouldering","Gym","Tennis"])
    user21 = new User("lamide1", "small", "Lamide", "Ogunnusi", "Sutton", "Systems Engineer", "New employee at LNRS looking forward to meeting new people!", "test", "21", ["Football","Bowling","Art"])
    user22 = new User("sharif1", "small", "Sharif", "Quansah", "Southampton", "Software Engineer", "New employee at Cirium looking forward to meeting new people!", "test", "23", ["Football","Gym","Tennis"])
    user23 = new User("evelyn1", "small", "Evelyn", "Quest", "London", "Data Scientist", "New employee at Cirium looking forward to meeting new people!", "test", "21", ["Art","Music","Bouldering"])
    user24 = new User("walid1", "small", "Walid", "Salih", "Sutton", "Software Engineer", "New employee at Cirium looking forward to meeting new people!", "test", "22", ["Football","Boxing","Food"])
    user25 = new User("hadeed1", "small", "Hadeed", "Shaikh", "Sutton", "Systems Engineer", "New employee at RSG looking forward to meeting new people!", "test", "21", ["Football","Bowling","Art"])
    user26 = new User("ramone1", "small", "Ramone", "Watson", "London", "Product Manager", "New employee at Cirium looking forward to meeting new people!", "test", "21", ["Football","Boxing","Food"])
    
    
    //Create tables and users
    createTables();
    addUser(user1);
    addUser(user2);
    addUser(user3);
    addUser(user4);
    addUser(user5);
    addUser(user6);
    addUser(user7);
    addUser(user8);
    addUser(user9);
    addUser(user10);
    addUser(user11);
    addUser(user12);
    addUser(user13);
    addUser(user14);
    addUser(user15);
    addUser(user16);
    addUser(user17);
    addUser(user18);
    addUser(user19);
    addUser(user20);
    addUser(user21);
    addUser(user22);
    addUser(user23);
    addUser(user24);
    addUser(user25);
    addUser(user26);





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
        db.run(`insert into users (username,password,forename,surname,location,role,biography,imagepath,age) values (?,?,?,?,?,?,?,?,?)`, [user.username,user.pwd,user.forename,user.surname,user.location,user.role,user.bio,user.imagepath, user.age],err=>{if(err){console.log("ffs:"+err)}else{console.log("made user "+user.forename + " " + user.surname)}});
        
        // stage 2 - add interests
        user.interests.forEach(interest=>{
            db.run(`INSERT INTO tags (username,interest) values (?,?);`,[user.username,interest],err=>{if(err){console.log("ffs:"+err)}else{console.log("added interest "+interest+" for "+user.forename+" "+user.surname)}});
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















module.exports = async (app) =>{
    
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('people.db');
    let sql = `select * from people`;
    let people;
    db.all(sql,[],(err, rows)=>{if(err)throw err; people=rows;});
    db.close();
    // IF not logged in go to login
    app.get('/home',(req,res)=>{
        res.render('home',{people: people, test: "Hello"});
    });

    app.post('/home',(req,res)=>{
        console.log("testeste");
        res.redirect('/home');
    })
}
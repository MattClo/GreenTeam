module.exports = async (app) =>{
    
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('people.db');
    let sql1 = `select * from users`;
    let sql2 = `select * from tags`;
    let people;
    await(db.all(sql1,[],(err, rows)=>{if(err)throw err; people=rows;}));
    let interests;
    db.all(sql2,[],(err, rows)=>{if(err)throw err; interests=rows;});

    app.get('/home',(req,res)=>{
        if (req.session.user==null){
            res.redirect('/login');
        }
        else{
            res.render('home',{people: people, interests: interests, user:req.session.user, name:req.session.name});
        }
    });

    app.post('/home',(req,res)=>{
        if (req.session.user==null){
            res.redirect('/login');
        }
        else{
        res.redirect('/home');
        }
    })
}
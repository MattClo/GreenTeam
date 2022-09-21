module.exports = async (app) =>{
    
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('people.db');
    let sql = `select * from people`;
    let people;
    await(db.all(sql,[],(err, rows)=>{if(err)throw err; people=rows;}));
    db.close();

    app.get('/home',(req,res)=>{
        if (req.session.user==null){
            res.redirect('/login');
        }
        else{
        res.render('home',{people: people, user:req.session.user});
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
module.exports = async (app) =>{
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('people.db');
    let sql = `select * from users`;
    let people;
    await(db.all(sql,[],(err, rows)=>{if(err)throw err; people=rows;}));
    db.close();

    app.post('/authentication',(req,res)=>{
        people.forEach(person=>{
            if(person.username==req.body.username){
                req.session.name=person.forename+" "+person.surname;
                req.session.user=req.body.username;
            }
        });
        if(req.session.user!=null){
            res.redirect('/home');
        }
        else{
            res.redirect('/login');
        }
    })
}

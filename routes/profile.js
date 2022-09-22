module.exports = async (app) =>{
    // IF not logged in go to login        
    let profileuser;
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('people.db');
    let sql = `select * from people`;
    let people;
    (db.all(sql,[],(err, rows)=>{if(err)throw err; people=rows;}));
    db.close();

    app.get('/profile', (req,res)=>{
        if (req.session.user==null){
            res.redirect('/login');
        }
        else{
            let profileuser;
            people.forEach((person)=>{
                if(person.username==req.session.user){
                    profileuser=person;
                }
            });

            res.render('profile',{puser:profileuser,message:false});
        }
    });

    app.post('/profile',(req,res)=>{
        if (req.session.user==null){
            res.redirect('/login');
        }
        else{
            people.forEach((person)=>{
                if(person.username==req.body.username){
                    profileuser=person;
                }
            });
            let message = true
            if(req.session.user == profileuser.username){message=false;}
            res.render('profile',{puser:profileuser,message:message});
        }
    })
}
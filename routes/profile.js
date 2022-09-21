module.exports = async (app) =>{
    // IF not logged in go to login
    app.get('/profile', (req,res)=>{
        if (req.session.user==null){
            console.log("WHAT");
            res.redirect('/login');
        }
        else{
            res.render('profile',{username:req.session.user});
        }
    });

    app.post('/profile',(req,res)=>{
        if (req.session.user==null){
            res.redirect('/login');
        }
        else{
            res.render('profile',{username:req.body.username});
        }
    })
}
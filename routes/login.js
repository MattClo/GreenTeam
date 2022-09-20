module.exports = async (app) =>{
    app.get('/',(req,res)=>{
        res.redirect('/login');
    });
    app.get('/login',(req,res)=>{
        res.render('login');
    });

    app.post('/login',(req,res)=>{
        console.log("!!!");
        res.redirect('/login');
    })
}

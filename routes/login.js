module.exports = async (app) =>{
    app.get('/',(req,res)=>{
        req.session.user='';
        res.redirect('/login');
    });
    app.get('/login',(req,res)=>{
        req.session.user=null;
        res.render('login');
    });

    app.post('/login',(req,res)=>{
        req.session.user=null;
        res.render('/login');
    })
}

module.exports = async (app) =>{
    app.post('/authentication',(req,res)=>{
        req.session.user=req.body.username;
        res.redirect('/home');
    })
}

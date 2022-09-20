module.exports = async (app) =>{
    // IF not logged in go to login
    app.get('/home',(req,res)=>{
        console.log("Home loaded");
        res.render('home',{root: __dirname});
    });

    app.post('/home',(req,res)=>{
        console.log("testeste");
        res.redirect('/home');
    })
}


module.exports = async (app) =>{
    // IF not logged in go to login
    app.get('/profile', async (req,res)=>{

        
        //if(app.user === undefined){

            //return res.redirect("/login")
        //}

        //let profile = await mysql.get("command").then(response ={

            //zcode();
        //})


        //res.render('profile', {profile: profile});

        res.render('profile');

    });

    app.post('/profile',(req,res)=>{
        res.redirect('/profile');
    })
}
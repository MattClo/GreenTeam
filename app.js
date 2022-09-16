const express=require('express');
const router = express.Router();
const app = express();
const port = 5000;
app.use("/",router);
app.set('view engine', 'ejs');


// IF not logged in go to login
router.get('/',(req,res)=>{
    res.redirect('/login')
});

router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',(req,res)=>{
    console.log("did this");
    res.render('login');
});

router.get('/home',(req,res)=>{
    res.render('home');
});
router.post('/home',(req,res)=>{
    console.log("WOWWO");
    res.redirect('/home');
})

router.post('/home',(req,res)=>{
    console.log("WOWWO");
    res.redirect('/home');
})




app.get('/profile',(req,res)=>{
    res.render('profile');
});
app.post('/profile',(req,res)=>{
    res.render('profile.html');
});



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
const express=require('express');
const app = express();
const router = express.Router();
app.use("/",router);
const port = 5000;


router.get('/login',(req,res)=>{
    res.render('login');
});

router.post('/home',(req,res)=>{
    console.log("!!!");
    res.redirect('/home');
})


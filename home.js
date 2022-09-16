const express=require('express');
const app = express();
const router = express.Router();

app.use("/",router);
const port = 5000;

// IF not logged in go to login
router.get('/',(req,res)=>{
    console.log("Home loaded");
    res.render('home.html',{root: __dirname});
});

router.post('/',(req,res)=>{
    console.log("testeste");
    res.redirect('/home');
})
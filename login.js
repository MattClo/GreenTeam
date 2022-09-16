const express=require('express');
const app = express();
const port = 5000;

app.post('/home',(req,res)=>{
    res.redirect('/home');
})


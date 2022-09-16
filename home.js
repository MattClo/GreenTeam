const express=require('express');
const app = express();
const port = 5000;

// IF not logged in go to login
app.get('/home',(req,res)=>{
    res.sendFile('home.html',{root: __dirname});
});

app.post('/home',(req,res)=>{
    res.redirect('/home');
})
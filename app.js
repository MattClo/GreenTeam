const express=require('express');
const app = express();
const port = 5000;

// IF not logged in go to login
app.get('/',(req,res)=>{
    res.redirect('/login')
});

app.get('/login',(req,res)=>{
    res.sendFile('login.html',{root: __dirname});
});
app.post('/login',(req,res)=>{
    res.sendFile('login.html',{root: __dirname});
});

app.get('/home',(req,res)=>{
    res.sendFile('home.html',{root: __dirname});
});
app.post('/home',(req,res)=>{
    res.sendFile('home.html',{root: __dirname});
});

app.get('/profile',(req,res)=>{
    res.sendFile('profile.html',{root: __dirname});
});
app.post('/profile',(req,res)=>{
    res.sendFile('profile.html',{root: __dirname});
});



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
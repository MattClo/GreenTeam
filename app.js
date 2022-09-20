const fs=require('fs');
const express=require('express');
const session=require('express-session');
const path = require('path');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use('/dist/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/dist/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/css', express.static(__dirname+'/css'))


app.use(session({secret:"hi",saveUninitialized:true,resave:true,user:null}));

//Bodyparser for receiving post variables via json
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(route =>{
    const page = require(`./Routes/${route}`);
    page(app);
});


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
//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
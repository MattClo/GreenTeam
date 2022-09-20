const fs=require('fs');
const express=require('express');
const app = express();
const port = 5000;
app.set('view engine', 'ejs');

const routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(route =>{
    const page = require(`./Routes/${route}`);
    page(app);
});


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
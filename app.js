const fs=require('fs');
const express=require('express');
const path = require('path');
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))

const routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(route =>{
    const page = require(`./Routes/${route}`);
    page(app);
});


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
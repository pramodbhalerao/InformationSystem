const initExpress = require('./init/express');
const initRoutes = require('./init/routes');
require('./db');
const app = require('express')();

initExpress(app);

initRoutes(app);

app.listen(3000, ()=>{
    console.log("App running on localhost: 3000");
})
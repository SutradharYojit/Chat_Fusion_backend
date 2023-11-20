const express=require('express');
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const app=express();
const morgan = require('morgan'); // Middleware for logging HTTP requests
const userRegister=require('./api/routes/register_user')
const userRoute=require('./api/routes/user_route')



app.use(bodyParser.json()); // Middleware for parsing JSON data in request body
app.use(bodyParser.urlencoded({ extended: false })); // Middleware for parsing URL-encoded data
app.use(morgan('dev')); // Use morgan for HTTP request logging

app.use('/register',userRegister);
app.use('/user',userRoute);



module.exports = app;
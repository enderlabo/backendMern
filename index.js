

const express = require("express");
require("dotenv").config();
const { dbInit } = require('./dataBase/config');
const cors = require("cors");

const app = express();

//Database
dbInit();

//Cors
app.use( cors() );

//Public address
app.use( express.static('public') );
//Read and Parse from body
app.use( express.json() );
//Get Routes
app.use('/api/auth/', require('./routes/auth') );
app.use('/api/event/', require('./routes/events') );


app.listen( process.env.PORT, () => {

    console.log(`Listen on port ${ process.env.PORT }`)
})

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = process.env.port || 8080;

var kapcsolat = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"forgalminaplo"
});

kapcsolat.connect((err)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log('Connected to MySQL host...');
    }
});



app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
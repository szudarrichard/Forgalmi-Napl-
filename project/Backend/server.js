const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.port || 8080;


app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

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

app.post('/', (req, res) => {
    let data = {
        name: req.body.email,
        pass: req.body.passwrd,
        table: req.body.table
    }
    pool.query(`SELECT * FROM admin WHERE email='${data.email}' AND jelszo='${data.passwrd}'`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}...`);
});
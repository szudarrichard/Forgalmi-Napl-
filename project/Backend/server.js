const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'forgalminaplo',
});

app.post('/login', (req, res) => {
    let data = {
        email: req.body.email,
        pass: req.body.passwrd,
        table: req.body.table,
    };

    pool.query(`SELECT * FROM ${data.table} WHERE email='${data.email}' AND jelszo='${data.pass}'`, (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});

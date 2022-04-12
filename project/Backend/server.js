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

    pool.query(`SELECT * FROM ${data.table} WHERE email='${data.email}' AND password='${data.pass}'`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET ALL RECORDS FROM :table
app.get('/:table', (req, res) => {
    let table = req.params.table;

    pool.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET ONE RECORD FROM :table
app.get('/:table/:field/:id', (req, res) => {
    let table = req.params.table;
    let field = req.params.field;
    let id = req.params.id;
    pool.query(`SELECT * FROM ${table} WHERE ${field}='${id}'`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// INSERT RECORD TO :table
app.post('/:table', (req, res) => {
    let table = req.params.table;
    let data = req.body;

    let fields = 'ID';
    results = Object.keys(data);
    results.forEach((element) => {
        fields += ',' + element;
    });

    let str = '';
    results = Object.values(data);
    results.forEach((element) => {
        str += ',"' + element + '"';
    });

    console.log(fields);

    pool.query(`INSERT INTO ${table} (${fields}) VALUES(null ${str})`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// UPDATE RECORD IN :table
app.patch('/:table/:id', (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    let data = req.body;

    let str = '';
    fields = Object.keys(data);
    results = Object.values(data);

    for (let i = 0; i < fields.length; i++) {
        str += fields[i] + '="' + results[i] + '",';
    }

    str = str.substring(0, str.length - 1);
    pool.query(`UPDATE ${table} SET ${str} WHERE ID=${id}`, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// DELETE ONE RECORD FROM :table
app.delete('/:table/:id', (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    pool.query(`DELETE FROM ${table} WHERE ID=${id}`, (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});

"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

function getClient() {
    return new pg.Client({
      host: 'localhost',
      port: 5432,
      database: 'TrabBimDsi',
      user:'postgres',
      password: 'postgres',
    });
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('.'));

app.post('/app/cadpessoa', (req, res) => {
    let nome = req.body.name;
    let sobrenome = req.body.lastName;
    let sexo = req.body.sex;
    let telefone = req.body.phone;
    let endereco = req.body.address;
    const client = getClient();
    client.connect();
    client.query("INSERT INTO pessoa(nome, sobrenome, sexo, telefone, endereco) VALUES ($1, $2, $3, $4, $5)",
     [nome, sobrenome, sexo, telefone, endereco], (err, item) => {
        if(err){
            res.json(err);
            return next(err);
        } else {
          res.redirect("http://localhost:4200/");
        }
        client.end();
    });
});

app.get('/app/listpessoa', (req, res) => {
    const client = getClient();
    client.connect()
    client.query("SELECT * FROM pessoa", (err, result) => {
        if (err){
            res.jason(err)
            return next(err)
        } else {
            res.status(200).json(result.rows)
        }
        client.end();
    })
})

app.post('/app/delpessoa', (req, res) => {
    const client = getClient();
    const id = req.body.id;

    client.connect()

    client.query("DELETE FROM pessoa WHERE id = $1",[id], (err, result) => {
        if (err){
            res.jason(err)
            return next(err)
        } else {
            res.redirect("http://localhost:4200/");
        }
        client.end();
    })
})

app.post('/app/attpessoa', (req, res) => {
    const client = getClient();
    let id=req.body.id;
    let nome =req.body.name;
    let sobrenome=req.body.lastName;
    let sexo= req.body.sex;
    let telefone=req.body.phone;
    let endereco=req.body.address;

    client.connect()

    client.query("UPDATE pessoa SET nome = $1, sobrenome = $2, sexo = $3, telefone = $4, endereco = $5 WHERE id = $6",
    [nome, sobrenome, sexo, telefone, endereco, id], (err, result) => {
        if (err){
            res.jason(err)
            return next(err)
        } else {
            res.redirect("http://localhost:4200/");
        }
        client.end();
    })
})


app.listen(3000, function(){
    console.log('Servidor iniciado.');
});

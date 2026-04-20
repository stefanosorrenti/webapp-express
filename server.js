//IMPORTS
const express = require('express');
const app = express()
const port = 3000
const connection = require('./database/db');





//ENTRY POINT
app.get('/', (req, res) => {
    res.json('Benvenuto nel sever del film!')
});

//INDEX
app.get('/movies', (req, res) => {
    
    const indexSql  = 'SELECT * FROM movies' //SALVO IN UNA VARIABILE LA QUERY DA FARE AL DB
    connection.query(indexSql, (err, results) => { //EFFETTUO LA QUERY
        
        if (err) return res.status(500).json({error: 'Internal server error'}); //GESTISCO L'ERRORE LATO SERVER

        res.json(results) //RESTITUISCO LA TABAELLA IN FORMATO JSON
    })
});

//MESSAGGIO DI LOG IN CASO DI CONNESSIONE
app.listen(port, () => {
    console.log(`Sono in ascolto nel localhost alla porta ${port}`);
    
});
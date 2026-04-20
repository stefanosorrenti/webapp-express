//IMPORTS
const express = require('express');
const app = express()
const port = 3000
const connection = require('./database/db')




//ENTRY POINT
app.get('/', (req, res) => {
    res.json('Benvenuto nel sever del film!')
});


//MESSAGGIO DI LOG IN CASO DI CONNESSIONE
app.listen(port, () => {
    console.log(`Sono in ascolto nel localhost alla porta ${port}`);
    
});
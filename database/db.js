//IMPORTS
const mysql = require('mysql2');
const dotenv = require('dotenv').config()

//CREO LA CONNESSIONE CON IL DATABASE
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DB_NAME
});

//STABILISCO LA CONNESSIONE
connection.connect((err) => {
    if (err) throw err;
    console.log('Sei connesso al database');
    
    
    
});

module.exports = connection;

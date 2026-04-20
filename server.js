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

//SHOW
app.get('/movies/:id', (req, res) => {

    const id = parseInt(req.params.id) //SALVO IL PARAMETRO DINAMICO 'ID'
    const showMoviesSql = 'SELECT * FROM movies WHERE id = ?' //SALVO LA PRIMA QUERY DA FARE AL DATABASE
    const showReviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?' // SALVO LA SECONDA QUERY DA FARE AL DATABASE
    
    connection.query(showMoviesSql, [id], (err, moviesResults) => { //ESEGUO LA PRIMA QUERY AL DATABASE
        if (err) return res.status(500).json({error: 'Internal server error'}) //GESTISCO L'ERRORE LATO SERVER
        if (moviesResults.length === 0) return res.status(404).json({error: 'Not found'}) //GESTISCO L'ERRORE LATO CLIENT
        
        const movie = moviesResults[0] //SALVO LA SINGOLA RISORSA [0] TROVATA IN UNA VARIABILE

        connection.query(showReviewsSql, [id], (err, reviewsResults) => { //EFFETTUO LA SECONDA QUERY
            
          movie.reviews = reviewsResults  
            
          res.json(movie)
        })
    })
})

//MESSAGGIO DI LOG IN CASO DI CONNESSIONE
app.listen(port, () => {
    console.log(`Sono in ascolto nel localhost alla porta ${port}`);
    
});
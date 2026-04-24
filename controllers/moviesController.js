//IMPORTS
const { json } = require('express');
const connection = require('../database/db');


//INDEX CONTROLLER
const index =  (req, res) => {
    
    const indexSql  = 'SELECT * FROM movies' //SALVO IN UNA VARIABILE LA QUERY DA FARE AL DB
    connection.query(indexSql, (err, results) => { //EFFETTUO LA QUERY
        
        if (err) return res.status(500).json({error: 'Internal server error'}); //GESTISCO L'ERRORE LATO SERVER

        res.json(results) //RESTITUISCO LA TABAELLA IN FORMATO JSON
    })
};

//SHOW CONTROLLER
const show = (req, res) => {

    const id = parseInt(req.params.id) //SALVO IL PARAMETRO DINAMICO 'ID'
    const showMoviesSql = 'SELECT * FROM movies WHERE id = ?' //SALVO LA PRIMA QUERY DA FARE AL DATABASE
    const showReviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?' // SALVO LA SECONDA QUERY DA FARE AL DATABASE
    const showReviewsAvgSql = 'SELECT AVG(reviews.vote) AS avg_vote FROM reviews WHERE movie_id = ? ' //SALVO LA TERZA QUERY DA FARE AL DATABASE

    connection.query(showMoviesSql, [id], (err, moviesResults) => { //ESEGUO LA PRIMA QUERY AL DATABASE
        if (err) return res.status(500).json({error: 'Internal server error'}) //GESTISCO L'ERRORE LATO SERVER
        if (moviesResults.length === 0) return res.status(404).json({error: 'Not found'}) //GESTISCO L'ERRORE LATO CLIENT
        
        const movie = moviesResults[0] //SALVO LA SINGOLA RISORSA [0] TROVATA IN UNA VARIABILE

        connection.query(showReviewsSql, [id], (err, reviewsResults) => { //EFFETTUO LA SECONDA QUERY
            
          movie.reviews = reviewsResults  
            
          
          connection.query(showReviewsAvgSql, [id], (err, avgResults) => {  //EFFETTUO LA TERZA QUERY PER LA MEDIA DEI VOTI
              //console.log(avgResults[0]);
              
            movie.avg_vote = avgResults[0].avg_vote  //AGGIUNGO UNA NUOVA CHIAVE VALORE AL NOSTRO OGETTO CON I DATI CHE MI SERVONO
              res.json(movie)
          })
        })

    })
};



//STORE
const store = (req, res) => {
    const body = req.body
    const { title, director, genre, release_year, abstract, image } = req.body
    const storeMovieSql = "INSERT INTO `db_movies`.`movies` (`title`, `director`, `genre`, `release_year`, `abstract`, `image`) VALUES (?, ?, ?, ?, ?, ?)"
    connection.query(storeMovieSql, [title, director, genre, release_year, abstract, image], (err, results) => {

        res.json({message: "Film aggiunto!", body})
    })
    
}
     


//STORE REVIEW  CONTROLLER
const store_review = (req, res) => {
    const id = parseInt(req.params.id) //SALVO IL MIO PARAMETRO DINAMICO ID
    const {movie_id, name, vote, text} = req.body //DESTRUTTURO I DATI DELLA MIA RICHIESTA
    if ( !name || !vote || !text ) return res.status(400).json({error: 'One or more values ​​left blank'})
    const storeReviewSql = 'INSERT INTO `db_movies`.`reviews` (`movie_id`, `name`, `vote`, `text`) VALUES (?, ?, ?, ?)' //SALVO LA MIA QUERY DA FARE AL DATABASE (AGGIUNGI UNA RIGA)
    connection.query(storeReviewSql,[id, name, vote, text], (err, results) => { //EFFETTUO LA RICHIESTA
        if (err) return res.status(500).json({error: 'Internal server error'}) //GESTICO L'ERRORE LATO SERVER
        if (results.affectedRows === 0) return res.status(404).json({error: 'Not Found'}) //GESTISCO L'ERRORE LATO CLIENT

        res.status(201).json({message: 'Recensione inviata!'})
        
    })
    
}

module.exports = { index, show, store, store_review};
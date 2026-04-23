//IMPORTS
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
    const showReviewsAvgSql = 'SELECT AVG(reviews.vote) AS avg_vote FROM reviews WHERE movie_id = ? '
    connection.query(showMoviesSql, [id], (err, moviesResults) => { //ESEGUO LA PRIMA QUERY AL DATABASE
        if (err) return res.status(500).json({error: 'Internal server error'}) //GESTISCO L'ERRORE LATO SERVER
        if (moviesResults.length === 0) return res.status(404).json({error: 'Not found'}) //GESTISCO L'ERRORE LATO CLIENT
        
        const movie = moviesResults[0] //SALVO LA SINGOLA RISORSA [0] TROVATA IN UNA VARIABILE

        connection.query(showReviewsSql, [id], (err, reviewsResults) => { //EFFETTUO LA SECONDA QUERY
            
          movie.reviews = reviewsResults  
            
          
          connection.query(showReviewsAvgSql, [id], (err, avgResults) => {
              //console.log(avgResults[0]);
              
            movie.avg_vote = avgResults[0].avg_vote 
              res.json(movie)
          })
        })

    })
};


//STORE CONTROLLER
const store = (req, res) => {
    res.send('sei nella rotta store')
}

module.exports = { index, show, store };
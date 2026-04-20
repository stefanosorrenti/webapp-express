//IMPORTS
const express = require('express'); 
const app = express()
const port = 3000
const moviesRouter = require('./routers/moviesRouter')



//MIDDLEWARES
app.use(express.static('public')) //PER LA GESTIONE DEI FILE STATICI



//ENTRY POINT
app.get('/', (req, res) => {
    res.json('Benvenuto nel sever del film!')
});

//MOVIES ROUTERS
app.use('/movies', moviesRouter)

//MESSAGGIO DI LOG IN CASO DI CONNESSIONE
app.listen(port, () => {
    console.log(`Sono in ascolto nel localhost alla porta ${port}`);
    
});
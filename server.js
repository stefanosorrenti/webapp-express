//IMPORTS
const express = require('express'); 
const app = express()
const port = 3000
const moviesRouter = require('./routers/moviesRouter');
const notFound = require('./middlewares/notFound');
const internalError = require('./middlewares/internalError');
const cors = require('cors')


//MIDDLEWARES
app.use(express.static('public')) //PER LA GESTIONE DEI FILE STATICI
app.use(cors()) //PER GESTIRE LA COMUNICAZIONE CON IL FRONTEND
app.use(express.json()) //PER LA GESTIONE DEL BODY DELLE MIE REQ

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


app.use(internalError); //MIDDLEWARES PER GESTIONE DEGLI ERRORI DEL SERVER API
app.use(notFound); //MIDDLEWARES PER GESTIONE DEGLI ERRORI DEL CLIENT
//IMPORTS
const express = require('express');

const app = express()
const port = 3000
app.get('/', (req, res) => {
    res.json('Benvenuto nel sever del film!')
});


app.listen(port, () => {
    console.log(`Sono in ascolto nel localhost alla porta ${port}`);
    
})
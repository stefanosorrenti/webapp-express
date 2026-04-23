//IMPORTS
const express = require('express')
const router = express.Router()
const moviesController = require("../controllers/moviesController") //CONTROLLERS PER LA LOGICA DELLE ROTTE

//INDEX
router.get('/', moviesController.index);

//SHOW
router.get('/:id', moviesController.show);

//STORE
router.post('/:id/review', moviesController.store);
module.exports = router;
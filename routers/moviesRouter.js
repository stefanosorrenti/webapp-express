//IMPORTS
const express = require('express')
const router = express.Router()
const moviesController = require("../controllers/moviesController") //CONTROLLERS PER LA LOGICA DELLE ROTTE

//INDEX
router.get('/', moviesController.index);

//SHOW
router.get('/:id', moviesController.show);

//STORE 
router.post('/', moviesController.store) 

//STORE REVIEW
router.post('/:id/review', moviesController.store_review);


module.exports = router;


/* cales51909@ryzid.com
Mamtmamt29

5%
NLT04RK6RWUJ6C
MEOW5EQRDGHHK9

15%
pey4p@deltajohnsons.com
Mamtmamt29!
MEOW15DUWLNN8R

17%
rjyfk@deltajohnsons.com
Mamtmamt29!
MEOW17BLMA8UDUW

*/


const express = require('express');
const router = express.Router();
const { getAll, insertCard, getCard, deleteCard } = require('../controllers/tarjetas.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')


//si comparten la misma ruta pero diferente verbos se puede poner 
// router.route(la ruta por ejemplo '/').verbo(funcion del controlador).verbo(funcion del controlador)
// router.route('/').get(getGoals).post(setGoal).....

router.route('/').get(protect,getAll).post(protect,insertCard)

router.get('/card/code/:code',protect,getCard)
router.delete('/:code',protect,deleteCard)
module.exports = router;
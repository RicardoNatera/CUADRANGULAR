const express = require('express');
const router = express.Router();
const { getAll, getGroup, deleteGroup, insertGroup } = require('../controllers/grupos.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

//si comparten la misma ruta pero diferente verbos se puede poner 
// router.route(la ruta por ejemplo '/').verbo(funcion del controlador).verbo(funcion del controlador)
// router.route('/').get(getGoals).post(setGoal).....

router.route('/').get(protect,getAll).post(protect,insertGroup)

router.get('/group/:nombre',protect,getGroup)
router.delete('/:id',protect,deleteGroup)

module.exports = router;
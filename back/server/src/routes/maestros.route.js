const express = require('express');
const router = express.Router();
const { getAll, insertTeacher, getTeacher, deleteTeacher } = require('../controllers/maestros.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

//si comparten la misma ruta pero diferente verbos se puede poner 
// router.route(la ruta por ejemplo '/').verbo(funcion del controlador).verbo(funcion del controlador)
// router.route('/').get(getGoals).post(setGoal).....

router.route('/').get(protect,getAll).post(protect,insertTeacher)

router.get('/teacher/:cedula',protect,getTeacher)
router.delete('/:id',protect,deleteTeacher)

module.exports = router;
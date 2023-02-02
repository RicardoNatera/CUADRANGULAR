const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe,getAll} = require('../controllers/user.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

//si comparten la misma ruta pero diferente verbos se puede poner 
// router.route(la ruta por ejemplo '/').verbo(funcion del controlador).verbo(funcion del controlador)
// router.route('/').get(getGoals).post(setGoal).....

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,protectAdmin,getMe)
router.get('/all',protect,getAll)
module.exports = router;
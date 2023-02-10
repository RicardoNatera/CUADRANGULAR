const express = require('express');
const router = express.Router();
const { getAll, insertCard, getCard, deleteCard } = require('../controllers/tarjetas.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

router.route('/').get(protect,getAll).post(protect,insertCard)

router.get('/card/code/:code',protect,getCard)
router.delete('/:code',protect,deleteCard)
module.exports = router;
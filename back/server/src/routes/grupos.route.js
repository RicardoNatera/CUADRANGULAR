const express = require('express');
const router = express.Router();
const { getAll, getGroup, deleteGroup, insertGroup } = require('../controllers/grupos.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

router.route('/').get(protect,getAll).post(protect,insertGroup)
router.route('/home').get(getAll)
router.get('/group/:nombre',protect,getGroup)
router.delete('/:id',protect,deleteGroup)

module.exports = router;
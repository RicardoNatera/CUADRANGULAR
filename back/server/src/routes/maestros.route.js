const express = require('express');
const router = express.Router();
const { getAll, insertTeacher, getTeacher, deleteTeacher } = require('../controllers/maestros.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

router.route('/').get(protect,getAll).post(protect,insertTeacher)

router.get('/teacher/:cedula',protect,getTeacher)
router.delete('/:id',protect,deleteTeacher)

module.exports = router;
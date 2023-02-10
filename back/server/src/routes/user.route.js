const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe,getAll, deleteUser, getUser} = require('../controllers/user.controller')
const { protect, protectAdmin } = require('../middlewares/auth.middleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,protectAdmin,getMe)
router.get('/all',protect,getAll)
router.route('/:id').get(protect,getUser).delete(protect,deleteUser)

module.exports = router;
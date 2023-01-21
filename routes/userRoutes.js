const express =  require('express')
const router = express.Router()

const {registerUser, signinUser, getMe, updateUser} = require('../controllers/userControllers') 
const {protect} = require('../middleware/authMiddleware')
router.post('/signup', registerUser)
router.post('/signin', signinUser)
router.get('/me', protect, getMe)
router.put('/me', protect, updateUser)

module.exports = router
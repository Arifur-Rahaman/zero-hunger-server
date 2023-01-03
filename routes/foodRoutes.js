const express = require('express')
const router = express.Router()
const { getFoods, addFood, getUserFood } = require('../controllers/foodControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getFoods)
    .post(protect, addFood)
router.route('/my')
    .get(protect, getUserFood)

module.exports = router
const express = require('express')
const router = express.Router()
const { getFoods,
    addFood,
    getUserFood,
    EditFoodById,
    getFoodById, 
    deleteFood } = require('../controllers/foodControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .get(protect, getFoods)
    .post(protect, addFood)

router.route('/my')
    .get(protect, getUserFood)

router.route('/:id')
    .put(protect, EditFoodById)
    .get(protect, getFoodById)
    .delete(protect, deleteFood)

module.exports = router
const express = require('express')
const router = express.Router()
const { 
    makeFoodRequest, 
    getFoodRequestByFoodId, 
    getFoodRequestByVolunteerId,
    confirmFoodRequest,
    deleteRequest
} = require('../controllers/requestControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .post(protect, makeFoodRequest)
router.route('/:id')
    .delete(protect, deleteRequest)
router.route('/foods/:food')
    .get(protect, getFoodRequestByFoodId)
router.route('/volunteers')
    .get(protect, getFoodRequestByVolunteerId)
router.route('/confirm')
    .put(protect, confirmFoodRequest)

module.exports = router
const express = require('express')
const router = express.Router()
const { makeFoodRequest, getFoodRequestByFoodId} = require('../controllers/requestControllers')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .post(protect, makeFoodRequest)
router.route('/:food')
    .get(protect, getFoodRequestByFoodId)

module.exports = router
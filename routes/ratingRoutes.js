const express = require('express')
const { addRating, getRatings, getRatingsByVolunteer } = require('../controllers/ratingController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/')
    .post(protect, addRating)
    .get(protect, getRatings)
router.route('/:volunteer')
    .get(protect, getRatingsByVolunteer)

module.exports = router
const Rate = require("../models/ratingModel")
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')

//@desc Add rating
//@route Post /api/rates
//@access Private
const addRating = asyncHandler(async (req, res) => {

    const { rating, volunteer, comment } = req.body

    if (!rating || !volunteer) {
        res.status(400)
        throw new Error('Please add all information')
    }

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Check volunteer exist or not in user
    const volunteerData = await User.findById(volunteer)
    if (!volunteerData) {
        res.status(401)
        throw new Error('Volunteer not found')
    }

    const request = await Rate.create({
        volunteer: volunteer,
        rating: rating,
        comment: comment || '',
    })
    res.status(201).json(request)
})


//@desc get all ratings
//@route /api/rates
//@access Private
const getRatings = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ratings = await Rate.find({})
    if (!ratings) {
        res.status(404)
        throw new Error('Ratings not found')
    }
    res.status(200).json(ratings)
})

//@desc ratings by volunteer id
//@route /api/rates/id
//@access Private
const getRatingsByVolunteer = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const ratings = await Rate.find({volunteer: req.params.volunteer})
    if (!ratings) {
        res.status(404)
        throw new Error('Ratings not found')
    }
    res.status(200).json(ratings)
})

module.exports = {
    addRating,
    getRatings,
    getRatingsByVolunteer,
}
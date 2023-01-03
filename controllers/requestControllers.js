const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Request = require('../models/requestModel')

//@desc Create request
//@route Post /api/requests
//@access Private
const makeFoodRequest = asyncHandler(async (req, res) => {
    const {motivation, donor, food} = req.body

    if (!motivation || !donor || !food){
        res.status(400)
        throw new Error('Please add all information')
    }

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Check already made a request or not
    const exist = await Request.find({volunteer: req.user._id})
    if(exist){
        res.status(400)
        throw new Error('Already made a request for this food')
    }
    const request = await Request.create({
        volunteer: req.user._id,
        donor,
        food,
        motivation,

    })
    res.status(201).json(request)
})

//@desc get request
//@route /api/request/:food
//@access Private
const getFoodRequestByFoodId = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)
    const food = req.params.food
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const request = await Request.find({food:food})
    if (!request) {
        res.status(404)
        throw new Error('Request not found')
    }
    res.status(200).json(request)
})




module.exports = {
    makeFoodRequest,
    getFoodRequestByFoodId,

}
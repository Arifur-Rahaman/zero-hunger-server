const asyncHandler = require('express-async-handler')
const sendEmail = require('./../utils/email')
const User = require('../models/userModel')
const Request = require('../models/requestModel')
const Food = require('../models/foodModel');
const { getMailText } = require('../utils/mailtext');

//@desc Create request
//@route Post /api/requests
//@access Private
const makeFoodRequest = asyncHandler(async (req, res) => {
    const { motivation, donor, food } = req.body

    if (!motivation || !donor || !food) {
        res.status(400)
        throw new Error('Please add all information')
    }

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const donorUser = await User.findById(donor)
    const requestedFood = await Food.findById(food)

    const request = await Request.create({
        volunteer: req.user._id,
        donor,
        food,
        motivation,

    })
    if (request) {
        try {
            await sendEmail({
                email: donorUser.email,
                subject: `Request for ${requestedFood.foodName} by ${req.user.name}`,
                message: getMailText(donorUser.name, 'You got a new request for the food')
            })
        } catch (error) {
            res.status(401)
            throw new Error(error)

        }
    }
    res.status(201).json(request)
})

//@desc confirm request
//@route Put /api/requests/confirm
//@access Private
const confirmFoodRequest = asyncHandler(async (req, res) => {
    const { food, _id: requestId } = req.body
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const updatedFood = await Food.findByIdAndUpdate(food, { status: 'booked' }, { new: true })
    await Request.updateMany({ food }, { status: 'denied' })
    const updatedRequest = await Request.findByIdAndUpdate(requestId, { status: 'confirmed' }, { new: true })
    const updatedRequests = await Request.find({ food }).populate('volunteer')
    const volunteer = await User.findById(updatedRequest.volunteer)

    try {
        await sendEmail({
            email: volunteer.email,
            subject: `Request for ${updatedFood.foodName} has been confirmed`,
            message: getMailText(volunteer.name, 'Your request has been confirmed')
        })
    } catch (error) {
        res.status(401)
        throw new Error(error)

    }

    res.status(200).json(updatedRequests)

})

//@desc get request
//@route /api/request/foods/:food
//@access Private
const getFoodRequestByFoodId = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)
    const food = req.params.food
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const request = await Request.find({ food: food }).populate('volunteer food')
    if (!request) {
        res.status(404)
        throw new Error('Request not found')
    }
    res.status(200).json(request)
})


//@desc get request
//@route /api/request/volunteers
//@access Private
const getFoodRequestByVolunteerId = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const request = await Request.find({ volunteer: req.user.id }).populate('donor food')
    if (!request) {
        res.status(404)
        throw new Error('Request not found')
    }
    res.status(200).json(request)
})

//@desc DELETE  request
//@route /api/requests/:id
//@access Private

const deleteRequest = asyncHandler(async(req, res)=>{
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const request = await Request.findById(req.params.id)
    if(!request){
        res.status(404)
        throw new Error('Request not found')
    }
    const removed = await request.remove()
    res.status(200).json(removed)
})




module.exports = {
    makeFoodRequest,
    getFoodRequestByFoodId,
    getFoodRequestByVolunteerId,
    confirmFoodRequest,
    deleteRequest,

}
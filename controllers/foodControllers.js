const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Food = require('../models/foodModel')

//@desc Create new Food
//@route Post /api/foods
//@access Private
const addFood = asyncHandler(async (req, res) => {
    const { foodName, description, address, area, location } = req.body

    if (!foodName || !description || !address || !area || !location) {
        res.status(400)
        throw new Error('Please add all information')
    }

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const food = await Food.create({
        foodName,
        description,
        area,
        address,
        location,
        donor: req.user._id,
    })
    res.status(201).json(food)
})


//@desc all foods
//@route /api/food
//@access Private
const getFoods = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const food = await Food.find({})
    if (!food) {
        res.status(404)
        throw new Error('Food not found')
    }
    res.status(200).json(food)
})

//@desc user foods
//@route /api/food/my
//@access Private
const getUserFood = asyncHandler(async (req, res) => {
    //Get user using the id in the jwt
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const food = await Food.find({donor: user})
    if (!food) {
        res.status(404)
        throw new Error('Food not found')
    }
    res.status(200).json(food)
})


module.exports = {
    addFood,
    getFoods,
    getUserFood,

}

const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Food = require('../models/foodModel')

//@desc Create new Food
//@route Post /api/foods
//@access Private
const addFood = asyncHandler(async (req, res) => {
    const { foodName, description, address, area, location, quantity, imageURL } = req.body

    if (!foodName || !description || !address || !area || !location || !quantity ||  !imageURL) {
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
        quantity,
        imageURL,
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

//desc PUT Edit food by id
//@route /api/foods/:id
//@access private
const EditFoodById = asyncHandler(
    async (req, res) => {
        const id = req.params.id
        const food = await Food.findById(id)
        if (!food) {
            res.status(404)
            throw new Error('Product not found')
        }
        const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedFood)
    }
)

module.exports = {
    addFood,
    getFoods,
    getUserFood,
    EditFoodById
}

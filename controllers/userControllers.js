const asyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@des Register new user
//@route /api/users/signup
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    //Find if user already exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            imageURL: user.imageURL,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new error('Invalid user data');
    }
})


//@des Login a user
//@route /api/users/signin
//@access Public
const signinUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email}) 

    //Check the user is exist or not and if exits then compare the password of user and db
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            imageURL: user.imageURL,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
    
})


//@desc get current user
//@route /api/users/me
//@access Private
const getMe = asyncHandler( async (req, res)=>{
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        imageURL: req.user.imageURL,
        address: req.user.address,
        phone: req.user.phone,
    }
    res.status(200).json(user)
})

//desc PUT Update user
//@route /api/users/my
//@access private
const updateUser = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user._id)
        if (!user) {
            res.status(404)
            throw new Error('Product not found')
        }
        user.imageURL = req.body.imageURL || user.imageURL
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.address = req.body.address || user.address
        const updatedUser = await user.save()
        // const updatedData = await User.findByIdAndUpdate(req.user._id, userData, { new: true })
        res.status(200).json(updatedUser)
    }
)


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}



module.exports = {
    registerUser,
    signinUser,
    getMe,
    updateUser
}
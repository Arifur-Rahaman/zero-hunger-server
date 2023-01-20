const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    phone:{
        type: String,
        required: [true, 'Please add a phone'],
    },
    address:{
        type: String,
        required: [true, 'Please add a address'],
    },
    imageURL:{
        type: String,
        default: 'https://res.cloudinary.com/ars-mart/image/upload/v1674221579/m5qu0ma1r6c9udpi2pk3.jpg'
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)
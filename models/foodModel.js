const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        area: {
            type: String,
            required: [true, 'Please enter area of the food']
        },
        address: {
            type: String,
            required: [true, 'Please enter address of the food']
        },
        foodName: {
            type: String,
            required: [true, 'Please enter name of the food']
        },
        description: {
            type: String,
            required: [true, 'Please enter description of the food']
        },
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        status:{
            type: String,
            require: true,
            enum: ['open', 'booked', 'served'],
            default: 'open',

        },

    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model('Food', foodSchema);
module.exports = Food
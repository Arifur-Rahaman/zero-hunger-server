const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        volunteer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        food: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Food'
        },
        motivation: {
            type: String,
            required: [true, 'Please enter description of the food']
        },
        status:{
            type: String,
            require: true,
            enum: ['pending', 'confirmed', 'denied'],
            default: 'pending',

        },

    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model('Request', requestSchema);
module.exports = Request
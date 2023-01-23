const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema(
    {
        volunteer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        comment: {
            type: String,
            default:''
        },
        rating: {
            type: Number,
            required: [true, 'Please enter rating'],
            default: 0
        },
    },
    {
        timestamps: true,
    }
);

const Rate = mongoose.model('Rate', ratingSchema);
module.exports = Rate
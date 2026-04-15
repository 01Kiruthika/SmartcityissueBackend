const mongoose = require('mongoose')

new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Id cannot be Empty!!"],
        trim: true,
        unique: true,
    },
    user_id: {
        type: Number,
        required: [true, "User id cannot be Empty!!"],
        unique: true,
    },
    Location: {
        type: String,
        required: [true, "Location cannot be Empty!!"],
    },
    proof: {
        type: String,
    },
    status:{
        type: String,
    }

}, {
    timestamps: true
})
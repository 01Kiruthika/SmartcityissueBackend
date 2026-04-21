const mongoose = require('mongoose')

const ComplaintSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        required: [true, "User id cannot be Empty!!"]
    },
    title: {
        type: String,
        required: [true, "title cannot be Empty!!"]
    },
    location: {
        type: String,
        required: [true, "Location cannot be Empty!!"],
    },

    proof: {
        type: String,
    },

    status: {
        type: String,
        enum: ["Pending", "InProgress", "Solved"],
        default: "Pending"
    },

    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        default: null
    },
    manager_name: {
        type: String,
        ref:"Register",
        default: null
    },

    completedProof: {
        type: String,
        default: null
    },

    complaintUpdated: {
        type: String,
        default: null
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Complaint", ComplaintSchema)
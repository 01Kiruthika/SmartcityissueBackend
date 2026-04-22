const mongoose = require('mongoose');

let RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name cannot be Empty!!"],
        trim: true,
        default: "Unknown Name"
    },

    phonenumber: {
        type: String,
        required: [true, "Phone Number cannot be Empty!!"],
        unique: [true, "Phone Number should be unique"],
        min: [10, "Phone Number must be 10 digits"],
    },

    password: {
        type: String,
        required: [true, "Password cannot be Empty!!"],
        min: [8, "Password must be at least 8 characters"],
    },
    address: {
        type: String,
        required: [true, "Address cannot be Empty!!"],
    },
    email: {
        type: String,
        required: [true, "Email cannot be Empty!!"],
    },
    role: {
        type: String,
        enum: ["admin", "citizen", "manager"],
        default: "citizen"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Register", RegisterSchema);
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
        minlength: [10, "Phone Number must be 10 digits"],
        maxlength: [10, "Phone Number must be 10 digits"],
        match: [/^[986]\d{9}$/, "Phone number must start with 9, 8, or 6 and be 10 digits"],
    },
    password: {
        type: String,
        required: [true, "Password cannot be Empty!!"],
        minlength: [8, "Password must be at least 8 characters"],
    },
    address: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        lowercase: true,
        trim: true,
        match: [ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Enter a valid email address"]
    },
    role: {
        type: String,
        enum: ["admin", "citizen", "manager"],
        default: "citizen"
    },
    profile_image: {
        type: String,
        default: null

    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Register", RegisterSchema);
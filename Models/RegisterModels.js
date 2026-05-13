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
    },
    password: {
        type: String,
        required: [true, "Password cannot be Empty!!"]
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
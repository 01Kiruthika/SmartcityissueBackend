const mongoose = require('mongoose')

const ProductModel = new mongoose.Schema({
    ProductName: {
        type: String,
        required: [true, "Product Name cannot be empty!!"],
        trim: true,
        default: "UnKnownProduct"
    },
    Price: {
        type: Number,
        required: [true, 'Price  cannot be empty'],
        min: [1, "Price must be at least 1"],
        max: [300, "Price not exceed 300"]
    },
    Stock: {
        type: Number,
        required: [true, 'Stock  cannot be empty'],
        min: [1, "stock must be at least 1"],
        max: [500, "stock not exceed 500"]
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product",ProductModel)
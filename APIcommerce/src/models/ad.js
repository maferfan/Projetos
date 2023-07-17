const mongoose = require('mongoose')

const Ad = mongoose.model('Ad', new mongoose.Schema({
    userId: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegotiable: Boolean,
    description: String,
    views: Number,
    status: String
}))

module.exports = Ad
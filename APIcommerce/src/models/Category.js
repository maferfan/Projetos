const mongoose = require('mongoose')

const Category = mongoose.model('Category', new mongoose.Schema({
    name: String,
    slug: String
}))

module.exports = Category
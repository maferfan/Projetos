const mongoose = require('mongoose')

const State = mongoose.model('State', new mongoose.Schema({
    name: String,
}))

module.exports = State
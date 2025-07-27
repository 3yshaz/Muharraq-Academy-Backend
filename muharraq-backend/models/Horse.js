const mongoose = require('mongoose')

const horseSchema= new mongoose.Schema({
    name: {type: String, required: true},
    breed: String,
    age: Number,
    isAvailable: {type: Boolean, default: true,},
}, {timestamps: true}
)

module.exports = mongoose.model('Horse', horseSchema)
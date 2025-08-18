const mongoose = require('mongoose')

const horseSchema= new mongoose.Schema({
    name: {type: String, required: true},
    breed: String,
    age: Number,
    isAvailable: {type: Boolean, default: true,},
    image: {type: String, default: 'default-horse.jpg'}

}, {timestamps: true}
)

module.exports = mongoose.model('Horse', horseSchema)
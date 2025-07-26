const mongoose = require('mongoose')

const packageSchema =new mongoose.Schema({
    name: {type: String, required: true}, 
    description: {type: String},
    price: {type: Number, required: true},
    session: {type: Number, required: true},
    durationInDays: {type: Number, required: true},
    isActive: {type: Boolean, default: true}
}, {timestamps:true})

module.exports = mongoose.model('Package', packageSchema)
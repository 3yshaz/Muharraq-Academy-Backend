const mongoose = require('mongoose')

const packageSchema =new mongoose.Schema({
    name: {type: String },
    description: {type: String},
    price: {type: Number, required: true},
    session: {type: Number, required: true},
    sessionsPerMonth: {type: Number, required: true},
    status:{ type: String, enum: ['pending', 'active', 'rejected','expired'], default: 'pending'},
    duration: {type: String, required: true},
    discipline: {type:String},
    imageUrl: {type: String}
}, {timestamps:true})

module.exports = mongoose.model('Package', packageSchema)

 
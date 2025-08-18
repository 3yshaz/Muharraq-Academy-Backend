const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true},
    bookedAt: { type: Date, default: Date.now},
    status: {type: String, default: 'pending'}
})


module.exports = mongoose.model('Booking', bookingSchema)
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true},
    dateBooked: { type: Date, default: Date.now}
})


module.exports = mongoose.model('Booking', bookingSchema)
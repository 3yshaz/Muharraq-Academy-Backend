const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    rider: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required: true},
    status: {type: String, enum: ['present', 'absent'], required: true},
    packageId: {type: mongoose.Schema.Types.ObjectId, ref: 'Package'},
}, {timestamps: true})

module.exports = mongoose.model('Attendance', attendanceSchema)
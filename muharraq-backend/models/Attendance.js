const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    rider: {type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true},
    data: {type: Date, required: true},
    status: {type: String, enum: ['present', 'absent'], required: true},
}, {timestamps: true})

module.exports = mongoose.model('Attendance', attendanceSchema)
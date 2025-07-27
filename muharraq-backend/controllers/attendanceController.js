const Attendance = require('../models/Attendance')

const markAttendance = async ( req, res) => {
    try {
        const attendance = new Attendance(req.body)
        await attendance.save()
        res.status(201).json(attendance)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


const getAllAttendance = async ( req, res ) => {
    try {
        const records = await Attendance.find().populate('rider').populate('horse')
        res.json(records)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getAttendanceByRider = async ( req, res) => {
    try {
        const riderId = req.params.riderId
        const records = await Attendance.find({ rider: riderId}).populate('horse')
        res.json(records)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }

}

const getAttendanceById = async ( req, res ) => {
    try {
        const record = await Attendance.findById(req.params.id).populate('rider').populate('horse')
        if (!record)
            return res.status(404).json({ message: 'Attendance not found'})
        res.json(record)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const updateAttendance = async ( req, res) => {
    try {
        const update = await Attendance.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updated)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteAttendance = async (req , res ) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id)
        res.json({ message: 'Attendance record deleted'})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


module.exports = {
    markAttendance,
    getAllAttendance,
    getAttendanceByRider,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
}
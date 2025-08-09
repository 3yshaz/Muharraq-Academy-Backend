const Attendance = require('../models/Attendance')
const User = require('../models/User')


const markAttendance = async ( req, res) => {

    try {
        const riderId = req.user.role === 'admin' ? req.body.riderId : req.user.userId 

        if (!riderId) {
            return res.status(401).send('Unauthorized: Rider ID missing from token')
        }

        const rider = await User.findById(riderId)

        if (!rider || !rider.selectedPackage) {
            return res.status(400).send('no package booked')
        }

        const { selectedPackage } = rider

        if (typeof selectedPackage.daysLeft !== 'number' || typeof selectedPackage.sessionLeft !== 'number')
        {
            return res.status(400).send('Invalid package data')
        }


        if (selectedPackage.daysLeft <= 0 || selectedPackage.sessionLeft <=0) {
            return res.status(400).send('no sessions or days left in the package') 
        }

        selectedPackage.daysLeft -= 1
        selectedPackage.sessionLeft -= 1

        await rider.save()

        await Attendance.create({
            rider: riderId,
            horse: req.body.horseId, 
            status: 'present',
            createdAt: new Date()
        })

        res.send("Attendance marked and package updated") 

    } catch (error) {
        console.error('Error marking attendance:', error)
        res.status(500).send('Internal Server Error') 
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
        console.log('Fetching attendance by rider', req.params.riderId)
        const riderId = req.params.riderId
        const records = await Attendance.find({ rider: riderId}).populate('horse')
        res.json(records)
    } catch (error) {
        console.error('Error fetching attendance', error)
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
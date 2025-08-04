const package = require('../models/Package')
const booking = require('../models/Booking')
const user = require('../models/User')


const createPackage = async (req, res) => {
    try {
        const pack = new package(req.body)
        await pack.save()
        res.status(201).json(pack)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


const getAllPackages = async (req, res) => {
    try {
        const packages = await package.find()
        res.json(packages)
    } catch (error) {
        res.status(500).json({ message: 'server error'})
    }
}


const getPackageById = async (req,res) => {
    try {
        const update = await package.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.json(update)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const updatePackage = async ( req, res) => {
    try {
        const update = await package.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.json(update)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


const deletePackage = async ( req, res) => {
    try {
        await package.findByIdAndDelete(req.params.id)
        res.json({ message: 'Package deleted successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const bookPackage = async (req, res ) => {
    const riderId = req.user.userId
    const { packageId } = req.body

    try {
        const pkg = await package.findById(packageId)
        if(!pkg) 
            return res.status(404).send('Package not found')

        await user.findByIdAndUpdate(riderId, {
            selectedPackage: {
                packageId: pkg._id,
                sessionLeft: pkg.sessionsPerMonth,
                daysLeft: pkg.sessionsPerMonth,
                bookedAt: new Date()
            }
        })
        await booking.create({
            user: riderId,
            package: pkg._id,
            bookedAt: new Date()
        })

        res.send('Package booked successfully')
    } catch (error) {
        console.error('Error in booking', error)
        res.status(500).send('error booking package')
    }

}

const getBookedPacks = async (req, res) => {
    try {
        const userId = req.user.userId

        const bookings = await booking.find({ user: userId }).populate('package')

        const bookedPackages = bookings.map(booking => booking.package)

        res.status(200).json(bookedPackages)
    } catch (error) {
        console.error('Error fetching rider bookings:', error)
        res.status(500).json({ message: 'Something went wrong'})
    }


}





module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    bookPackage,
    getBookedPacks
}
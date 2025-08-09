const package = require('../models/Package')
const Booking = require('../models/Booking')
const user = require('../models/User')

const bookPackage = async (req, res ) => {
    const riderId = req.user.userId
    const { packageId } = req.body

    try {
        const pkg = await package.findById(packageId)
        if(!pkg) 
            return res.status(404).send('Package not found')

        const existingBooking = await Booking.findOne({
            user: riderId,
            package: packageId,
            status: { $ne: 'expired' }
        })


        if(existingBooking) {
            return res.status(400).send('You have already booked this package.')
        }

        await user.findByIdAndUpdate(riderId, {
            selectedPackage: {
                packageId: pkg._id,
                sessionLeft: pkg.sessionsPerMonth,
                daysLeft: pkg.sessionsPerMonth,
                bookedAt: new Date(),
                status: 'pending'
            }
        })
        await Booking.create({
            user: riderId,
            package: pkg._id,
            bookedAt: new Date(),
            status: 'pending'
        })

        res.send('Package booked and marked as pending')
    } catch (error) {
        console.error('Error in booking', error)
        res.status(500).send('error booking package')
    }

}

const getBookedPacks = async (req, res) => {
    try {
        const userId = req.user.userId

        const bookings = await Booking.find({ user: userId }).populate('package')

        const bookedPackages = bookings.map(booking => booking.package)

        res.status(200).json(bookedPackages)
    } catch (error) {
        console.error('Error fetching rider bookings:', error)
        res.status(500).json({ message: 'Something went wrong'})
    }


}



const getPendingBookings = async (req, res) => {
    try {
        const pending = await Booking.find({ status: 'pending'})
        .populate('user', 'name')
        .populate('package', 'name price')
        .sort({ bookedAt: -1})
    
    console.log('pending bookings:', pending)
    res.json(pending)
    } catch (error) {
        console.error('error fetching pending bookings:', error)
        res.status(500).json({ error: 'failed to fetch pending bookings'})
    }
}

const confirmBooking = async (req, res) => {
    const { bookingId } = req.params

    try{
        const updated = await Booking.findByIdAndUpdate(
            bookingId, 
            { status: 'active'},
            { new: true}
        )

        if (!updated) return res.status(404).json({ message: 'Booking not found'})
        res.json({ message: 'Booking confirmed successfully'})
    } catch ( error ) {
        res.status(500).json({ error: 'Failed to confirm booking'})
    }
}


module.exports = {
    bookPackage,
    getBookedPacks,
    getPendingBookings,
    confirmBooking
}
const package = require('../models/Package')
const Booking = require('../models/Booking')
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


const deletePackageByRider = async (req, res) => { 
    
    try {
        const packageId = req.params.packageId
        const riderId = req.user.userId

        const foundPackage = await package.findOne({ _id: packageId, rider: riderId})

        if (!foundPackage) 
            return res.status(404).json({message: 'Package not found or not owned by rider'})

        await package.deleteOne({ _id: packageId})
        res.json({ message: 'Package deleted successfully'})
    } catch (eror) {
        console.error('Error deleting package', error)
        res.status(500).json({error: error.message})

    }

}



module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage,
    deletePackageByRider,
}
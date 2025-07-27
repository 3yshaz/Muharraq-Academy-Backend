const package = require('../models/Package')

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
        const packs = await package.find()
        res.json(packs)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


const getPackageById = async (req,res) => {
    try {
        const update = await package.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.json(updated)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const updatePackage = async ( req, res) => {
    try {
        const update = await package.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.json(updated)
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


module.exports = {
    createPackage,
    getAllPackages,
    getPackageById,
    updatePackage,
    deletePackage
}
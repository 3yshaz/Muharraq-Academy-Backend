const horse = require('../models/Horse')

const registerHorse = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : 'default-horse.jpg'

        const newHorseData = {
            ...req.body,
            image 
        }

        const newHorse = new horse(newHorseData)
        await newHorse.save()
        res.status(201).json(newHorse)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getAllHorses = async ( req, res) => {
    try {
        const horses = await horse.find()
        res.json(horses)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getHorseById = async ( req, res) => {
    try {
        const horsy = await horse.findById(req.params.id)
        if (!horsy) 
            return res.status(404).json({message: 'Horse not found'})

        res.json(horsy)
    } catch (error) {
        res.status(500).json({error: error.messgae})
    }
}

const updateHorse = async ( req, res) => {
    try {

        if (req.file) {
            req.body.image = req.file.filename
        }

        const update = await horse.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(update)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteHorse = async ( req, res) => {
    try {
        await horse.findByIdAndDelete(req.params.id)
        res.json({ message: 'Horse deleted successfully'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    registerHorse,
    getAllHorses,
    getHorseById,
    updateHorse,
    deleteHorse
}
const User = require('../models/User')
// const middleWare = require('../middleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const creatToken = (_id, role) => {
    return jwt.sign({_id, role}, process.env.JWT_SECRET, { expiresIn: '3'})
}

const signingUp = async (req, res) => {
    try {
        const { name, email, password, role, age, weight, contactNumber, packageId} = req.body
        const exists = await User.findOne({ email })
        if(exists)
            return res.status(400).json({error: '!!! Email already in use !!!'})
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const newUser = await User.create ({
            name,
            email,
            password: hash,
            role,
            age: role === 'rider' ? age: undefined,
            weight: role === 'rider' ? weight: undefined,
            contactNumber: role === 'rider' ? contactNumber: undefined,
            package: role === 'rider' ? packageId: undefined,
        })
        const token = creatToken(newUser._id, newUser.role)
        res.status(201).json({token, user: newUser})

    } catch (error) {
        res.status(500).json({ error: error.message})
        
    }
}

const loginUser = async ( req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user)
            return res.status(400).json({ error: 'Invalid Email :)'})
        const match = await bcrypt.compare(password, user.password)
        if(!match) 
            return res.status(400).json({error: 'Invalid Password :)'})
        const token = creatToken(user._id, user.role)
        res.status(200).json({token, user})

    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}


const getAllUsers = async ( req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) 
            return res.status(404).json({message: 'User not found :('})
        res.json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const update = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(update)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message: 'User delelted successfully :D!'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = { 
    signingUp,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
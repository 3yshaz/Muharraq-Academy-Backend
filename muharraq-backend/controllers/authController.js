const User = require('../models/User')
const middleWare = require('../middleware')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signingUp = async (req, res) => {
    try {
        const { name, email, password, role, age, weight, contactNumber, packageId} = req.body
        const exists = await User.findOne({ email })
        if(exists)
            return res.status(400).json({error: '!!! Email already in use !!!'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User({
            name,
            email,
            password: hashedPassword,
            role,
            age: role === 'rider' ? age: undefined,
            weight: role === 'rider' ? weight: undefined,
            contactNumber: role === 'rider' ? contactNumber: undefined,
            package: role === 'rider' ? packageId: undefined,
        })

        await newUser.save()
        res.status(201).json({ message: "User registered successfully"})

    } catch (error) {
        res.status(500).json({ error: error.message})
        
    }
}

const loginUser = async ( req,res) => {
    try {
        console.log('Request Body:', req.body)
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and pass are required'})
          }
        const user = await User.findOne({email})
        if (!user)
            return res.status(400).json({ error: 'Invalid Email :)'})
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.status(400).json({error: 'Invalid Password :)'}) }
            console.log('JWT_SECRET:', process.env.JWT_SECRET);
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ error: 'Missing JWT_SECRET in environment' });
            }
        const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.status(200).json({ message: "Login Successfully",
            token,
            role: user.role,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

        }})


    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

const getAllRiders = async ( req, res) => {

    try {
        const riders = await User.find({ role: 'rider'})
        res.status(200).json(riders)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch riders', error})
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
        console.log('params id', req.params.id)
        const user = await User.findById(req.params.id)
        if (!user) 
            return res.status(404).json({message: 'User not found :('})
        res.json(user)
    } catch (error) {
        console.error('error fetching user', error)
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
const getMyProfile = async (req, res) => {

    try {
        const userId = req.user?.userId
        if (!userId) return res.status(400).json({message: "INvalid token"})


        const user = await User.findById(userId).populate('selectedPackage.packageId')

        if (!user) {
            return res.status(404).json({message: 'user not found'})
        }



        res.status(200).json(user)
    } catch (error) {
        console.error('Error fetching profile:', error)
        res.status(500).json({message: 'Server error'})
    }
}

const updateProfileImage = async ( req, res) => {
    console.log('Uploaded file: ', req.file)
    try {
        const userId = req.user.userId
        const imagePath = req.file ? req.file.filename : null


        if ( !imagePath) {
            return res.status(400).json({ message: 'No image uploaded'})
        }


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profileImage: imagePath},
            {new: true}
        )
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error})
    }
}

module.exports = { 
    signingUp,
    loginUser,
    getAllRiders,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getMyProfile,
    updateProfileImage
}
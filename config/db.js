const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongoDB connected!')
    } catch (error) {
        console.error('mongoDB connection error :(', error.message)
    }
}

module.exports = connect
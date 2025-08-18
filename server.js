const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connect = require('./config/db')
const cors = require('cors')
require('dotenv').config()


const authRoutes = require('./routes/authRoutes')
const horseRoutes = require('./routes/horseRoutes')
const packageRoutes = require('./routes/PackageRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/users', authRoutes)
app.use('/api/horse', horseRoutes)
app.use('/api/packages', packageRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/images', express.static('public/images'))

app.use(session({
    secret: 'anything', //process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}))
connect()

app.get('/', (req,res) => {
    res.send('Welcome to Muharraq Equestrian Academy API🏇')
})

const PORT= process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
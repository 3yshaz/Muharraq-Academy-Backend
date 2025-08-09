const express = require('express')
const router = express.Router()
const controller = require('../controllers/bookingController')
const middleware = require('../middleware/index')


router.post('/book', middleware.requireAuth, middleware.requireRider, controller.bookPackage)

router.get('/my/booking', middleware.requireAuth, middleware.requireRider, controller.getBookedPacks)

router.get('/pending', middleware.requireAuth, middleware.requireAdmin, controller.getPendingBookings)

router.put('/confirm/:bookindId', middleware.requireAuth, middleware.requireAdmin, controller.confirmBooking)

module.exports = router
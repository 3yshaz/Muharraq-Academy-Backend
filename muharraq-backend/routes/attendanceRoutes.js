const express = require('express')
const router = express.router()
const controller = require('../controllers/attendanceController')

router.post('/', controller.markAttendance)

router.get('/', controller.getAllAttendance)
router.get('/rider/:riderId', controller.getAttendanceByRider)
router.get('/:id', controller.getAttendanceById)

router.put('/:id', controller.updateAttendance)

router.delete('/:id', controller.deleteAttendance)


module.exports = router
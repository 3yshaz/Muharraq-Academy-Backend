const express = require('express')
const router = express.Router()
const controller = require('../controllers/attendanceController')
const middleware = require('../middleware/index')


router.post('/', middleware.requireAuth, middleware.requireAdmin, controller.markAttendance)

router.get('/', middleware.requireAuth, middleware.requireAdmin, controller.getAllAttendance)
router.get('/rider/:riderId', middleware.requireAuth, middleware.requireRider, controller.getAttendanceByRider)
router.get('/:id', middleware.requireAuth, middleware.requireAdmin, controller.getAttendanceById)

router.put('/:id', middleware.requireAuth, middleware.requireAdmin, controller.updateAttendance)

router.delete('/:id', middleware.requireAuth, middleware.requireAdmin, controller.deleteAttendance)


module.exports = router
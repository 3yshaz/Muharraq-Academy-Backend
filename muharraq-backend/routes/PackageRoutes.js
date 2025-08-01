const express = require('express')
const router = express.Router()
const controller = require('../controllers/packageController')
const middleware = require('../middleware/index')



router.post('/', middleware.requireAuth, middleware.requireAdmin, controller.createPackage) 
router.post('/book', middleware.requireAuth, controller.bookPackage)
router.post('/my/booking', middleware.requireAuth, controller.getBookedPacks)

router.get('/', controller.getAllPackages)
router.get('/:id', controller.getPackageById)

router.put('/:id', middleware.requireAuth, middleware.requireAdmin, controller.updatePackage)

router.delete('/:id', middleware.requireAuth, middleware.requireAdmin, controller.deletePackage)


module.exports = router
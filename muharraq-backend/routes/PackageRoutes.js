const express = require('express')
const router = express.Router()
const controller = require('../controllers/packageController')

router.post('/', controller.createPackage) 

router.get('/', controller.getAllPackages)
router.get('/:id', controller.getPackageById)

router.put('/:id', controller.updatePackage)

router.delete('/:id', controller.deletePackage)

module.exports = router
const express = requrie('express')
const router = express.router()
const controller = require('../controllers/packageControllers')

router.post('/', controller.createPackage) 

router.get('/', controller.getAllPackages)
router.get('/:id', controller.getPackageById)

router.put('/:id', controller.updatePackage)

router.delete('/:id', controller.deletePackage)

module.exports = router
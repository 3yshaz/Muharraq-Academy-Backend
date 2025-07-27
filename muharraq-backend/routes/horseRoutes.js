const express = require('express')
const router = express.Router()
const horseController = require('../controllers/horseController')
const middleware = require('../middleware/index')


router.post('/', horseController.registerHorse)

router.get('/', horseController.getAllHorses)
router.get('/:id', horseController.getHorseById)

router.put('/:id', horseController.updateHorse)

router.delete('/:id', horseController.deleteHorse)

module.exports = router
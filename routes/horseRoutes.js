const express = require('express')
const router = express.Router()
const horseController = require('../controllers/horseController')
const middleware = require('../middleware/index')
const upload = require('../middleware/uploads')



router.post('/', middleware.requireAuth, middleware.requireAdmin, upload.single('image'), horseController.registerHorse)

router.get('/', middleware.requireAuth, horseController.getAllHorses)
router.get('/:id', middleware.requireAuth, horseController.getHorseById)

router.put('/:id', middleware.requireAuth, middleware.requireAdmin, horseController.updateHorse)

router.delete('/:id', middleware.requireAuth, middleware.requireAdmin, horseController.deleteHorse)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const middleware = require('../middleware/index')


router.post('/signup', controller.signingUp)
router.post('/login', controller.loginUser)

router.get('/', middleware.requireAuth, middleware.requireAdmin, controller.getAllUsers)
router.get('/:id', middleware.requireAuth, controller.getUserById)

router.put('/:id', middleware.requireAuth, controller.updateUser)

router.delete('/:id', middleware.requireAuth, middleware.requireAdmin, controller.deleteUser)


module.exports = router

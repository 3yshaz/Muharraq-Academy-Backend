const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const middleware = require('../middleware/index')


router.post('/signup', controller.signingUp)
router.post('/login', controller.loginUser)

router.get('/', controller.getAllUsers)
router.get('/:id', controller.getUserById)

router.put('/:id', controller.updateUser)

router.delete('/:id', controller.deleteUser)


module.exports = router

const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')



router.post('/signup', controller.signingUp)

router.post('/login', controller.loginUser)


module.exports = router

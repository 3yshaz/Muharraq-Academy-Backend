const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const middleware = require('../middleware/index')
const upload = require('../middleware/uploads')


router.post('/signup', controller.signingUp)
router.post('/login', controller.loginUser)

router.get('/riders', middleware.requireAuth, middleware.requireAdmin, controller.getAllRiders)
router.get('/', middleware.requireAuth, middleware.requireAdmin, controller.getAllUsers)
router.get('/:id', middleware.requireAuth, controller.getUserById)


router.put('/profile/image', middleware.requireAuth, middleware.requireRider, upload.single('profileImage'), controller.updateProfileImage)
router.put('/:id', middleware.requireAuth, controller.updateUser)

router.delete('/:id', middleware.requireAuth, middleware.requireAdmin, controller.deleteUser)

router.get('/profile/me', middleware.requireAuth, controller.getMyProfile)


module.exports = router

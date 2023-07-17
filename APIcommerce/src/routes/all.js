const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const AdsController = require('../controllers/adsController')
const Auth = require('../middleware/Auth')
const AuthValidator = require('../validators/AuthValidator')
const UserValidator = require('../validators/UserValidator')

router.get('/ping', async (req, res) => {
    res.json({ pong: true })
})

router.get('/states', Auth.private, UserController.getStates)
router.post('/user/signin', AuthValidator.signin, AuthController.signin)
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

router.get('/user/me', Auth.private, UserController.info)
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.edit)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', Auth.private, AdsController.addAction)
router.get('/ad/list', AdsController.getList)
router.get('/ad/item', AdsController.getItem)
router.post('/ad/:id', Auth.private, AdsController.editAction)



module.exports = router
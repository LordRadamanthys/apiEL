const express = require('express')
const routes = express.Router()
const userController = require('./controller/userController')
const interestsController = require('./controller/interestController')
const newsController = require('./controller/newsController')
const videoController = require('./controller/videoControlle')
const multer = require('multer')
const auth = require('./middleware/auth')
const multerConfig = require('./middleware/multer')

routes.post('/login', userController.login)
routes.post('/user', multer(multerConfig.uploads('profilePics')).single('image'), userController.create)
routes.put('/user',auth, multer(multerConfig.uploads('profilePics')).single('image'), userController.update)
routes.get('/user/:id',auth, userController.get)
routes.get('/user/',auth, userController.getAll)

routes.post('/videos', multer(multerConfig.uploads('videos')).single('video'), videoController.create)
routes.get('/videos/:id', videoController.get)
routes.get('/videos', videoController.getAll)


routes.post('/interests', auth, interestsController.create)
routes.get('/interests/:id', auth, interestsController.get)
routes.get('/interests', auth, interestsController.getAll)

routes.post('/news', auth, multer(multerConfig.uploads('newsPics')).single('image'), newsController.create)
routes.get('/news/:id', auth, newsController.get)
routes.get('/news', auth, newsController.getAll)

module.exports = routes
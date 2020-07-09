const express = require('express')
const routes = express.Router()
const userController = require('./controller/userController')
const interestsController = require('./controller/interestController')
const newsController = require('./controller/newsController')
const videoController = require('./controller/videoControlle')
const multer = require('multer')
const multerConfig = require('./middleware/multer')

routes.post('/login', userController.login)
routes.post('/user', multer(multerConfig.uploads('profilePics')).single('image'), userController.create)

routes.post('/videos', multer(multerConfig.uploads('videos')).single('video'), videoController.create)
routes.get('/videos/:id', videoController.get)
routes.get('/videos', videoController.getAll)


routes.post('/interests', interestsController.create)
routes.get('/interests/:id', interestsController.get)
routes.get('/interests', interestsController.getAll)

routes.post('/news', multer(multerConfig.uploads('newsPics')).single('image'), newsController.create)
routes.get('/news/:id', newsController.get)
routes.get('/news', newsController.getAll)

module.exports = routes